import type { Metadata } from 'next';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { PageShell } from '@/components/ui/page-shell';
import { faqGroups, faqs } from '@/content/data/faq';

export const metadata: Metadata = { title: '자주 묻는 질문', description: '계정·비용, 설치, 보안, 오류, 업무 적용에 대한 질문과 답.' };

export default function Page() {
  return (
    <PageShell title="자주 묻는 질문" description={`질문 ${faqs.length}개. 찾는 답이 없으면 수업 시간에 물어보세요.`} full={false}>
      {faqGroups.map((g) => (
        <section key={g}>
          <h2>{g}</h2>
          <Accordions>
            {faqs
              .filter((f) => f.group === g)
              .map((f) => (
                <Accordion key={f.q} title={f.q}>
                  <p>{f.a}</p>
                </Accordion>
              ))}
          </Accordions>
        </section>
      ))}
    </PageShell>
  );
}
