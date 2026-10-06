'use client';
import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Grant } from '@/lib/supabase';

type Result = { title: string; agency: string; deadline: string; eligibility: string; suspicious: boolean; suspicious_text: string };

/** 공고문을 붙여 넣으면 서버(/api/extract)가 Claude API로 항목을 뽑아 등록 폼을 채운다. 저장은 사람이 확인 후. */
export function ExtractPanel({ session, onExtract }: { session: Session; onExtract: (g: Partial<Grant>) => void }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  return (
    <div className="form">
      <strong>공고문으로 등록</strong>
      <span className="meta">공고문 텍스트를 붙여 넣으면 AI가 사업명·주관기관·마감일을 아래 등록 폼에 채워 줍니다. 저장 전에 꼭 확인하세요.</span>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="공고문을 여기에 붙여 넣으세요" />
      <button
        disabled={busy || !text.trim()}
        onClick={async () => {
          setBusy(true);
          setError('');
          setResult(null);
          const res = await fetch('/api/extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
            body: JSON.stringify({ text }),
          });
          const data = await res.json();
          setBusy(false);
          if (!res.ok) return setError(data.error ?? '실패했어요.');
          setResult(data);
          onExtract({ title: data.title, agency: data.agency, deadline: data.deadline });
        }}
      >
        {busy ? 'AI가 읽는 중…' : 'AI로 항목 뽑기'}
      </button>
      {error && <span className="error">{error}</span>}
      {result && (
        <div className="notice">
          {result.suspicious && (
            <p className="error">
              ⚠ 공고문에 AI에게 보내는 지시문으로 보이는 문장이 있어요. 원문을 확인하세요: “{result.suspicious_text}”
            </p>
          )}
          <p>지원자격: {result.eligibility || '(찾지 못함)'}</p>
          {!result.deadline && <p className="error">마감일을 확실히 찾지 못했어요. 직접 입력하세요.</p>}
          <p className="meta">아래 등록 폼의 값을 확인·수정한 뒤 [저장]을 누르세요.</p>
        </div>
      )}
    </div>
  );
}
