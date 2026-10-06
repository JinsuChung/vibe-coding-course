'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, supabaseConfigured, type Grant } from '@/lib/supabase';
import { ExtractPanel } from '@/components/extract-panel';

function dday(deadline: string) {
  const today = new Date(new Date().toISOString().slice(0, 10));
  return Math.round((Date.parse(deadline) - today.getTime()) / 86_400_000);
}

export function Board() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Partial<Grant> | undefined>();

  // 목록 불러오기 (누구나 읽기 정책)
  const load = useCallback(async () => {
    const { data, error } = await supabase.from('grants').select('*').order('deadline');
    if (error) setError(`목록을 불러오지 못했어요: ${error.message}`);
    else setGrants(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }
    load();
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [load]);

  if (!supabaseConfigured) {
    return (
      <p className="notice">
        Supabase 연결 정보가 없어요. <code>.env.local.example</code>을 복사해 <code>.env.local</code>을 만들고 값을 넣은 뒤 개발 서버를 다시
        시작하세요.
      </p>
    );
  }

  return (
    <>
      <AuthPanel session={session} />
      {session && <ExtractPanel session={session} onExtract={setDraft} />}
      {session && <GrantForm onSaved={load} initial={draft} />}
      {error && <p className="notice error">{error}</p>}
      {loading ? (
        <p className="meta">불러오는 중…</p>
      ) : (
        <div className="grid">
          {grants.map((g) => {
            const d = dday(g.deadline);
            return (
              <article key={g.id} className={`card ${d >= 0 && d <= 7 ? 'urgent' : ''} ${d < 0 ? 'past' : ''}`}>
                <div className="dday">{d < 0 ? '마감' : d === 0 ? 'D-DAY' : `D-${d}`}</div>
                <strong>{g.title}</strong>
                <div className="meta">
                  {g.agency ?? '기관 미정'} · 마감 {g.deadline} · 담당 {g.owner ?? '미정'}
                </div>
                {session && (
                  <button
                    className="link"
                    onClick={async () => {
                      if (!confirm(`"${g.title}"을(를) 삭제할까요?`)) return;
                      const { error, count } = await supabase.from('grants').delete({ count: 'exact' }).eq('id', g.id);
                      if (error) alert(error.message);
                      else if (count === 0) alert('본인이 등록한 공모만 삭제할 수 있어요 (RLS 정책).');
                      load();
                    }}
                  >
                    삭제
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

/** 담당자 로그인: 계정은 Supabase 대시보드 Authentication → Users 에서 미리 만들어 둔다 */
function AuthPanel({ session }: { session: Session | null }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  if (session) {
    return (
      <div className="bar">
        <span>{session.user.email} 로그인 중 · 공모를 등록할 수 있어요</span>
        <button className="secondary" onClick={() => supabase.auth.signOut()}>
          로그아웃
        </button>
      </div>
    );
  }
  return (
    <form
      className="bar"
      onSubmit={async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setMsg(error ? '로그인 실패: 이메일과 비밀번호를 확인하세요.' : '');
      }}
    >
      <span>담당자 로그인</span>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">로그인</button>
      {msg && <span className="error">{msg}</span>}
    </form>
  );
}

/** 공모 등록 폼 (로그인한 직원만 추가 정책) */
export function GrantForm({ onSaved, initial }: { onSaved: () => void; initial?: Partial<Grant> }) {
  const [form, setForm] = useState({ title: '', agency: '', deadline: '', owner: '', ...clean(initial) });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (initial) setForm((f) => ({ ...f, ...clean(initial) }));
  }, [initial]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        const { error } = await supabase.from('grants').insert({
          title: form.title,
          agency: form.agency || null,
          deadline: form.deadline,
          owner: form.owner || null,
        });
        setSaving(false);
        if (error) setMsg(`저장 실패: ${error.message}`);
        else {
          setMsg('저장했어요.');
          setForm({ title: '', agency: '', deadline: '', owner: '' });
          onSaved();
        }
      }}
    >
      <strong>공모 등록</strong>
      <input placeholder="사업명 (필수)" value={form.title} onChange={set('title')} required />
      <input placeholder="주관기관" value={form.agency} onChange={set('agency')} />
      <label>
        마감일 <input type="date" value={form.deadline} onChange={set('deadline')} required />
      </label>
      <input placeholder="담당자" value={form.owner} onChange={set('owner')} />
      <button type="submit" disabled={saving}>
        {saving ? '저장 중…' : '저장'}
      </button>
      {msg && <span className="meta">{msg}</span>}
    </form>
  );
}

function clean(g?: Partial<Grant>) {
  if (!g) return {};
  return {
    ...(g.title != null && { title: g.title }),
    ...(g.agency != null && { agency: g.agency }),
    ...(g.deadline != null && { deadline: g.deadline }),
    ...(g.owner != null && { owner: g.owner }),
  };
}
