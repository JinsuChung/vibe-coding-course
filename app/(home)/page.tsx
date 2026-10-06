import Link from 'next/link';
import { ArrowRight, ClipboardCopy, Presentation, ListChecks, MousePointerClick } from 'lucide-react';
import { ContinueButton, CourseMap } from '@/components/home/home-client';
import { PromptCard } from '@/components/prompt/prompt-card';
import { examples } from '@/content/data/examples';
import { prompts } from '@/content/data/prompts';
import { instructor } from '@/lib/shared';

const featuredPrompts = ['plan-only', 'excel-merge-run', 'interview-spec', 'git-commit'];
const featuredExamples = ['expense-merge', 'contract-extract', 'grant-board', 'notice-auto', 'meeting-minutes', 'event-signup'];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* 히어로 */}
      <section className="relative overflow-hidden bg-[#002855] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-[36rem] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00a3e0 0%, transparent 65%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-24 size-[28rem] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
            삼육대학교 산학협력단 직원 교육 · 6회차
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.2] tracking-[-0.045em] sm:text-6xl">
            기획하는 사람이
            <br />
            <span className="bg-gradient-to-r from-[#7fd3ff] to-white bg-clip-text text-transparent">곧 만드는 사람</span>이 됩니다
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Claude Code로 내 업무에 필요한 작은 소프트웨어를 직접 만들고, 쓰고, 필요하면 배포합니다. 프롬프트는 복사해서 바로 쓰고, 혼자서도 끝까지
            따라올 수 있어요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/sessions/1"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#002855] transition-transform hover:-translate-y-0.5"
            >
              1회차 시작하기 <ArrowRight className="size-4" />
            </Link>
            <ContinueButton />
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white/90 hover:text-white"
            >
              과정 소개와 준비물
            </Link>
          </div>
          <p className="mt-10 text-sm text-white/60">강의 · {instructor}</p>
        </div>
      </section>

      {/* 과정 지도 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">6회차 과정 지도</h2>
            <p className="mt-1 text-fd-muted-foreground">로컬 → 안전망 → 서버 → 데이터 → AI. 실습을 체크하면 진도가 차오릅니다.</p>
          </div>
          <Link href="/start" className="text-sm font-medium text-fd-primary hover:underline">
            사전 준비 체크리스트 →
          </Link>
        </div>
        <CourseMap />
      </section>

      {/* 사용법 */}
      <section className="border-y bg-fd-muted/50">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            { icon: ClipboardCopy, t: '복사해서 바로', d: '모든 프롬프트에 복사 버튼. 주황색 빈칸을 채우면 내 업무에 맞게 바뀝니다.' },
            { icon: MousePointerClick, t: '눌러 보며 이해', d: '에이전트, 커밋, 배포, 보안을 시뮬레이터로 직접 체험합니다.' },
            { icon: ListChecks, t: '혼자서도 끝까지', d: '단계마다 예상 결과와 "막혔을 때" 도움말. 진도는 브라우저에 저장돼요.' },
            { icon: Presentation, t: '함께 보는 발표 모드', d: 'P 키 하나로 큰 글씨 슬라이드, 실습 타이머, 페이지 QR 코드.' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border bg-fd-background p-5">
              <Icon className="size-6 text-fd-primary" />
              <p className="mt-3 font-bold">{t}</p>
              <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 바로 쓰는 프롬프트 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">바로 쓰는 프롬프트</h2>
          <Link href="/prompts" className="text-sm font-medium text-fd-primary hover:underline">
            {prompts.length}개 모두 보기 →
          </Link>
        </div>
        <div className="grid gap-x-5 lg:grid-cols-2">
          {featuredPrompts.map((id) => (
            <PromptCard key={id} id={id} compact />
          ))}
        </div>
      </section>

      {/* 업무 예시 */}
      <section className="border-t bg-fd-muted/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">산학협력단 업무 예시</h2>
              <p className="mt-1 text-fd-muted-foreground">연구비, 협약, 과제, 행사, 문서, 총무, 대외협력, 통계 — 30가지 장면</p>
            </div>
            <Link href="/examples" className="text-sm font-medium text-fd-primary hover:underline">
              30개 모두 보기 →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredExamples.map((id) => {
              const e = examples.find((x) => x.id === id)!;
              return (
                <Link key={id} href={`/examples/${id}`} className="rounded-2xl border bg-fd-background p-5 transition-colors hover:border-fd-primary">
                  <span className="text-xs font-medium text-fd-muted-foreground">
                    {e.area} · {e.kind}
                  </span>
                  <p className="mt-1.5 font-bold leading-6">{e.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-fd-muted-foreground">{e.situation}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-8 text-sm text-fd-muted-foreground sm:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/syu-logo.png" alt="삼육대학교" className="h-7 w-auto dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/syu-logo-white.png" alt="삼육대학교" className="hidden h-7 w-auto dark:block" />
          <span>업무를 바꾸는 바이브 코딩 · 강의 {instructor}</span>
          <span className="ml-auto">실습 자료는 모두 교육용 가상 데이터입니다.</span>
        </div>
      </footer>
    </main>
  );
}
