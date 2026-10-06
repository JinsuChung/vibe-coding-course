export type CheckItem = { id: string; label: string; hint?: string; href?: string };
export type CheckList = { id: string; title: string; items: CheckItem[] };

export const checklists: Record<string, CheckList> = {
  'prep-1': {
    id: 'prep-1',
    title: '1회차 전에 준비할 것',
    items: [
      { id: 'laptop', label: '노트북 (Windows 10 이상 또는 macOS 13 이상)', hint: '메모리 4GB 이상, 인터넷 연결' },
      {
        id: 'claude-pro',
        label: 'Claude 유료 플랜(Pro 이상) 계정',
        hint: '무료 플랜에는 Claude Code가 포함되지 않습니다. 기관 구매 여부는 담당자에게 확인하세요.',
        href: 'https://claude.ai',
      },
      { id: 'desktop-app', label: 'Claude 데스크톱 앱 설치', href: '/start/setup' },
      { id: 'sample-1', label: '1회차 실습 자료 내려받아 압축 풀기', href: '/downloads' },
    ],
  },
  'prep-2': {
    id: 'prep-2',
    title: '2회차 전에 준비할 것',
    items: [
      { id: 'homework-1', label: '1회차 과제: 내 업무의 반복 작업 3가지 적어 오기', href: '/sessions/1#과제' },
      {
        id: 'python',
        label: 'Python 설치 확인 (엑셀 처리용)',
        hint: 'Claude Code에게 "Python이 설치돼 있는지 확인해줘"라고 물어보면 됩니다.',
        href: '/start/setup#python',
      },
      { id: 'sample-2', label: '2회차 실습 자료 내려받기', href: '/downloads' },
    ],
  },
  'prep-3': {
    id: 'prep-3',
    title: '3회차 전에 준비할 것',
    items: [
      { id: 'github', label: 'GitHub 계정 가입 (업무용 이메일 권장)', href: 'https://github.com/signup' },
      { id: 'git', label: 'Git 설치 확인', hint: 'Windows는 Git for Windows 설치', href: '/start/setup#git' },
      { id: '2fa', label: 'GitHub 2단계 인증용 휴대폰 준비' },
    ],
  },
  'prep-4': {
    id: 'prep-4',
    title: '4회차 전에 준비할 것',
    items: [
      { id: 'node', label: 'Node.js LTS 설치', href: '/start/setup#nodejs' },
      { id: 'vercel', label: 'Vercel 가입 ("Continue with GitHub")', href: 'https://vercel.com/signup' },
    ],
  },
  'prep-5': {
    id: 'prep-5',
    title: '5회차 전에 준비할 것',
    items: [
      { id: 'supabase', label: 'Supabase 가입 (GitHub 계정으로)', href: 'https://supabase.com' },
      { id: 'supabase-slots', label: '무료 프로젝트 자리 확인 (최대 2개)' },
      { id: 'session4-done', label: '4회차 공모 보드가 배포돼 있음 (없으면 자료실의 완성본 사용)', href: '/downloads' },
    ],
  },
  'prep-6': {
    id: 'prep-6',
    title: '6회차 전에 준비할 것',
    items: [
      { id: 'console', label: 'Claude Console 계정, API 크레딧, 월 사용 한도 설정', href: 'https://platform.claude.com' },
      { id: 'supabase-wake', label: 'Supabase 프로젝트가 일시정지돼 있지 않은지 확인' },
      { id: 'sample-6', label: '6회차 공고문·회의록 자료 내려받기', href: '/downloads' },
    ],
  },
};
