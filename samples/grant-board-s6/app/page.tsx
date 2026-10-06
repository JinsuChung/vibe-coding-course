import { Board } from '@/components/board';

export default function Page() {
  return (
    <main>
      <h1>삼육대 산단 공모 보드</h1>
      <Board />
      <p className="meta">교육용 가상 데이터 · 6회차 완성본 (Supabase + Claude API)</p>
    </main>
  );
}
