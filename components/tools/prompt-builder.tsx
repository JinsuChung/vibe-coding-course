'use client';
import { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { useStored } from '@/lib/storage';
import { cn } from '@/lib/cn';
import { CopyButton } from '@/components/prompt/copy-button';

type Fields = { purpose: string; input: string; output: string; rules: string; verify: string };
type Opts = { planFirst: boolean; interview: boolean; resultFolder: boolean; korean: boolean };

const EMPTY: Fields = { purpose: '', input: '', output: '', rules: '', verify: '' };
const DEFAULT_OPTS: Opts = { planFirst: true, interview: false, resultFolder: true, korean: false };

const PRESETS: { label: string; f: Fields }[] = [
  {
    label: '엑셀 취합',
    f: {
      purpose: '월말 과제별 집행률 보고',
      input: '집행내역 폴더의 엑셀 10개',
      output: '과제별·비목별 합계 표, 결과/집행현황_취합.xlsx',
      rules: '원본은 절대 수정하지 말 것\n금액은 원 단위 쉼표',
      verify: '파일별 합계와 총합을 대조한 검산표를 보여줄 것',
    },
  },
  {
    label: '파일명 변경',
    f: {
      purpose: '증빙 파일 검색·감사 대응',
      input: '증빙 폴더의 파일과 증빙목록.xlsx',
      output: '날짜_과제번호_품목 규칙으로 바뀐 파일 이름',
      rules: '변경 전/후 표를 먼저 보여주고 승인 후 실행\n되돌리기 방법 준비',
      verify: '바꾼 뒤 파일 개수가 같은지 확인',
    },
  },
  {
    label: '회의록 요약',
    f: {
      purpose: '회의 후속 조치 공유',
      input: '회의록 폴더의 텍스트 파일',
      output: '회의정리.xlsx — 결정사항, 할 일(담당·기한)',
      rules: '회의록에 없는 내용은 넣지 말 것\n담당·기한이 없으면 "미정"',
      verify: '회의록 1개를 골라 표와 대조한 결과를 보여줄 것',
    },
  },
];

const LABELS: { key: keyof Fields; label: string; q: string; ph: string }[] = [
  { key: 'purpose', label: '목적', q: '왜 하나요?', ph: '예) 월말 과제별 집행률 보고' },
  { key: 'input', label: '입력', q: '무엇을 가지고?', ph: '예) 집행내역 폴더의 엑셀 10개' },
  { key: 'output', label: '출력', q: '무엇을 만들어?', ph: '예) 과제별 합계 표, 결과/취합.xlsx' },
  { key: 'rules', label: '조건', q: '지켜야 할 것은? (줄마다 하나)', ph: '예) 원본 수정 금지' },
  { key: 'verify', label: '검증', q: '맞는지 어떻게 확인?', ph: '예) 파일별 합계와 총합 대조' },
];

export function PromptBuilder() {
  const [f, setF] = useStored<Fields>('builder:fields', EMPTY);
  const [o, setO] = useStored<Opts>('builder:opts', DEFAULT_OPTS);

  const prompt = useMemo(() => {
    const lines: string[] = [];
    if (o.interview) {
      lines.push(`나는 ${f.output || '[만들 것]'}을(를) 만들고 싶어. 목적은 ${f.purpose || '[목적]'}이야.`);
      lines.push('내가 미처 생각 못 한 부분까지 질문해서 요구사항을 정리한 뒤 기획서.md로 저장해줘. 질문은 한 번에 3개 이하로.');
      if (f.input) lines.push(`참고할 자료: ${f.input}`);
      return lines.join('\n');
    }
    if (f.purpose) lines.push(`[목적] ${f.purpose}`);
    lines.push(`[입력] ${f.input || '(입력 자료)'}`);
    lines.push(`[출력] ${f.output || '(만들 결과물)'}`);
    const rules = f.rules
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    if (o.resultFolder) rules.push("결과물은 '결과' 폴더에 새로 만들 것");
    if (o.korean) rules.push('답변과 파일은 모두 한국어로');
    if (rules.length) lines.push(`[조건]\n${rules.map((r) => `- ${r}`).join('\n')}`);
    if (f.verify) lines.push(`[검증] ${f.verify}`);
    if (o.planFirst) lines.push('\n아직 실행하지 말고, 어떻게 할지 계획부터 보여줘. 내가 승인하면 그때 실행해.');
    return lines.join('\n');
  }, [f, o]);

  const filled = LABELS.filter((l) => f[l.key].trim()).length;
  const suggestion = f.rules
    .split('\n')
    .map((r) => r.trim())
    .filter((r) => /원본|형식|폴더|쉼표|YYYY|한국어|삭제|이동/.test(r));

  return (
    <div className="not-prose my-6 grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border bg-fd-card p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold">5요소 채우기</span>
          <span className="text-sm text-fd-muted-foreground">{filled}/5</span>
          <span className="ml-auto flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setF(p.f)}
                className="rounded-full border px-2.5 py-1 text-xs font-medium hover:bg-fd-accent"
              >
                예시: {p.label}
              </button>
            ))}
          </span>
        </div>
        <div className="space-y-3">
          {LABELS.map((l) => (
            <label key={l.key} className="block text-sm">
              <span className="font-semibold">{l.label}</span>
              <span className="ml-1.5 text-fd-muted-foreground">{l.q}</span>
              {l.key === 'rules' ? (
                <textarea
                  rows={3}
                  value={f[l.key]}
                  placeholder={l.ph}
                  onChange={(e) => setF((prev) => ({ ...prev, [l.key]: e.target.value }))}
                  className="mt-1 w-full rounded-lg border bg-fd-background px-3 py-2 outline-none focus:ring-2 focus:ring-fd-ring"
                />
              ) : (
                <input
                  value={f[l.key]}
                  placeholder={l.ph}
                  onChange={(e) => setF((prev) => ({ ...prev, [l.key]: e.target.value }))}
                  className="mt-1 w-full rounded-lg border bg-fd-background px-3 py-2 outline-none focus:ring-2 focus:ring-fd-ring"
                />
              )}
            </label>
          ))}
        </div>
        <fieldset className="mt-4 grid gap-2 border-t pt-4 text-sm sm:grid-cols-2">
          <legend className="sr-only">옵션</legend>
          {(
            [
              ['planFirst', '먼저 계획만 보여줘 (플랜)'],
              ['interview', '질문부터 해줘 (인터뷰형)'],
              ['resultFolder', "결과는 '결과' 폴더에"],
              ['korean', '모두 한국어로'],
            ] as const
          ).map(([k, label]) => (
            <label key={k} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={o[k]}
                onChange={(e) => setO((prev) => ({ ...prev, [k]: e.target.checked }))}
                className="size-4"
              />
              {label}
            </label>
          ))}
        </fieldset>
        <button
          type="button"
          onClick={() => {
            setF(EMPTY);
            setO(DEFAULT_OPTS);
          }}
          className="mt-3 text-xs text-fd-muted-foreground underline"
        >
          모두 지우기
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border-2 border-fd-primary/30 bg-fd-background">
          <div className="flex items-center gap-2 border-b px-4 py-2.5">
            <Sparkles className="size-4 text-fd-primary" />
            <span className="font-semibold">완성된 프롬프트</span>
            <CopyButton text={() => prompt} className="ml-auto" />
          </div>
          <pre className="whitespace-pre-wrap px-4 py-3 font-sans text-[1rem] leading-7 tracking-[-0.015em]">{prompt}</pre>
        </div>
        <div className={cn('rounded-xl border bg-fd-card p-4 text-sm leading-6', !suggestion.length && 'opacity-70')}>
          <p className="font-semibold">CLAUDE.md에 옮겨 둘 만한 조건</p>
          {suggestion.length ? (
            <ul className="mt-1 list-disc pl-5">
              {suggestion.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-fd-muted-foreground">원본 보호, 날짜·금액 형식, 저장 폴더처럼 매번 반복할 조건을 적으면 여기에 추천돼요.</p>
          )}
        </div>
        <div className="rounded-xl border bg-fd-card p-4 text-sm leading-6">
          <p className="font-semibold">체크 포인트</p>
          <ul className="mt-1 space-y-1">
            <li>{f.input ? '✓' : '○'} 입력: AI가 볼 파일·폴더를 이름으로 적었나요?</li>
            <li>{f.output ? '✓' : '○'} 출력: 결과물의 모양과 저장 위치가 있나요?</li>
            <li>{f.verify ? '✓' : '○'} 검증: AI가 스스로 확인할 기준을 줬나요?</li>
            <li>{o.planFirst || o.interview ? '✓' : '○'} 파일을 바꾸는 일이면 계획부터 보게 했나요?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
