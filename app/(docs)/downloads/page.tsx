import type { Metadata } from 'next';
import { Download, FileArchive, FileText, GitBranch } from 'lucide-react';
import { Callout } from 'fumadocs-ui/components/callout';
import { PageShell } from '@/components/ui/page-shell';
import { ProgressTransfer } from '@/components/library/progress-transfer';
import { gitConfig } from '@/lib/shared';

export const metadata: Metadata = { title: '자료실', description: '실습 자료, 교안 PDF, 회차별 완성본, 진도 옮기기.' };

const files = [
  { name: '1회차 실습 자료', file: '/downloads/session1-practice.zip', desc: '뒤섞인 파일 30여 개 (가상 협약서 PDF, 집행내역 엑셀, 사진, 문서)', icon: FileArchive },
  { name: '2회차 실습 자료', file: '/downloads/session2-practice.zip', desc: '집행내역 엑셀 10개(양식 조금씩 다름), 증빙 파일 20개, 증빙목록, 협약서 PDF', icon: FileArchive },
  { name: '3회차 시작 자료 · 출장비 계산기', file: '/downloads/session3-expense-calculator.zip', desc: '2회차 실습 2-3의 완성본. 2회차 결과물이 없으면 이것으로 시작', icon: FileArchive },
  { name: '4회차 완성본 · 공모 D-day 보드', file: '/downloads/session4-grant-board.zip', desc: 'Next.js 공모 보드 (가상 데이터 10건). 5회차를 이것으로 시작할 수 있어요', icon: FileArchive },
  { name: '5회차 완성본 · 공모 보드 + Supabase', file: '/downloads/session5-grant-board.zip', desc: 'DB 연결, 담당자 로그인, 등록 폼, RLS 정책 SQL 포함. 6회차를 이것으로 시작할 수 있어요', icon: FileArchive },
  { name: '6회차 완성본 · 공고문 자동 등록', file: '/downloads/session6-grant-board.zip', desc: '5회차 + Claude API로 공고문에서 항목 추출, 숨은 지시문 경고, 로그인한 담당자만 호출', icon: FileArchive },
  { name: '6회차 실습 자료', file: '/downloads/session6-practice.zip', desc: '가상 공고문 3개(1개는 숨은 지시문 포함), 회의록 5개, 문의 메일 8개', icon: FileArchive },
  { name: '교안 PDF (인쇄용)', file: '/downloads/vibe-coding-handout.pdf', desc: 'A4 인쇄용 강의 교안 전체', icon: FileText },
];

export default function Page() {
  return (
    <PageShell title="자료실" description="실습 자료는 모두 교육용 가상 데이터입니다. 실제 기관·인물과 관계없습니다." full={false}>
      <div className="not-prose grid gap-3">
        {files.map((f) => {
          const Icon = f.icon;
          return (
            <a
              key={f.file}
              href={f.file}
              download
              className="flex items-center gap-4 rounded-xl border bg-fd-card p-4 transition-colors hover:border-fd-primary"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-fd-primary/10 text-fd-primary">
                <Icon className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">{f.name}</span>
                <span className="block text-sm text-fd-muted-foreground">{f.desc}</span>
              </span>
              <Download className="size-4 text-fd-muted-foreground" />
            </a>
          );
        })}
        <a
          href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 rounded-xl border bg-fd-card p-4 transition-colors hover:border-fd-primary"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-fd-primary/10 text-fd-primary">
            <GitBranch className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block font-semibold">이 사이트의 소스 (GitHub)</span>
            <span className="block text-sm text-fd-muted-foreground">이 강의 사이트도 Claude Code로 만들었습니다. 복제해서 직접 고쳐 보세요.</span>
          </span>
        </a>
      </div>

      <Callout type="info" title="압축 풀기">
        Windows 기본 압축 풀기에서 한글 파일명이 깨지면 반디집 같은 압축 프로그램으로 다시 풀어 보세요. 압축을 푼 폴더를 Claude Code에서 열면 됩니다.
      </Callout>

      <h2 id="진도-옮기기">진도 옮기기</h2>
      <p>진도는 이 브라우저에만 저장됩니다. 다른 PC나 브라우저로 옮기려면 코드를 복사해 그쪽에서 붙여 넣으세요.</p>
      <ProgressTransfer />
    </PageShell>
  );
}
