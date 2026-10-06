import { grants } from '@/data/grants';

// 오늘 날짜 기준 D-day를 매번 새로 계산하도록 요청마다 렌더링
export const dynamic = 'force-dynamic';

function dday(deadline: string) {
  const today = new Date(new Date().toISOString().slice(0, 10));
  return Math.round((Date.parse(deadline) - today.getTime()) / 86_400_000);
}

export default function Page() {
  const list = [...grants].sort((a, b) => a.deadline.localeCompare(b.deadline));
  return (
    <main>
      <h1>삼육대 산단 공모 보드</h1>
      <div className="grid">
        {list.map((g) => {
          const d = dday(g.deadline);
          return (
            <article key={g.id} className={`card ${d >= 0 && d <= 7 ? 'urgent' : ''} ${d < 0 ? 'past' : ''}`}>
              <div className="dday">{d < 0 ? '마감' : d === 0 ? 'D-DAY' : `D-${d}`}</div>
              <strong>{g.title}</strong>
              <div className="meta">{g.agency} · 마감 {g.deadline} · 담당 {g.owner}</div>
            </article>
          );
        })}
      </div>
      <p className="meta">교육용 가상 데이터</p>
    </main>
  );
}
