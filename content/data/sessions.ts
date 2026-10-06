export type SessionMeta = {
  n: number;
  slug: string;
  title: string;
  short: string;
  minutes: number;
  stage: string;
  oneLiner: string;
  goals: string[];
  output: string;
  tools: string[];
  color: string;
};

export const sessions: SessionMeta[] = [
  {
    n: 1,
    slug: '/sessions/1',
    title: '바이브 코딩에서 에이전틱 엔지니어링으로',
    short: '개념과 첫 만남',
    minutes: 35,
    stage: '개념',
    oneLiner: '이제 소프트웨어는 사는 것이 아니라, 말로 주문해서 쓰고 버리는 것이 된다.',
    goals: [
      '바이브 코딩과 에이전틱 엔지니어링의 차이를 내 말로 설명할 수 있다',
      '챗봇(웹 채팅)과 에이전트(Claude Code)의 차이를 안다',
      'Claude Code를 설치하고 내 폴더에서 첫 작업을 시킨다',
    ],
    output: 'Claude Code 설치, 내 폴더 파악 보고서',
    tools: ['Claude Code 데스크톱 앱'],
    color: '#0b4a9e',
  },
  {
    n: 2,
    slug: '/sessions/2',
    title: '인스턴트 소프트웨어: 쓰고 지우는 내 업무 도구',
    short: '내 PC에서 만들기',
    minutes: 40,
    stage: '로컬',
    oneLiner: '기획이 곧 프롬프트이고, 프롬프트가 곧 프로그램이다.',
    goals: [
      '탐색 → 계획 → 실행 → 검증 4단계로 Claude Code에 일을 시킨다',
      '업무 프롬프트 5요소(목적·입력·출력·조건·검증)로 요청을 쓴다',
      'CLAUDE.md로 "우리 팀 규칙"을 AI에게 알려 둔다',
    ],
    output: '엑셀 취합기, 파일 일괄 정리, 한 장짜리 HTML 도구',
    tools: ['Claude Code', '플랜 모드', 'CLAUDE.md'],
    color: '#0e7490',
  },
  {
    n: 3,
    slug: '/sessions/3',
    title: 'Git과 GitHub: AI와 일할 때의 안전망',
    short: '되돌리기와 저장',
    minutes: 35,
    stage: '안전망',
    oneLiner: 'Git은 게임의 세이브 포인트, GitHub는 그 세이브를 올려두는 클라우드다.',
    goals: [
      '저장소·커밋·푸시·.gitignore 4가지 개념을 설명할 수 있다',
      'Claude Code에게 "커밋해줘", "어제 상태로 되돌려줘"를 시켜 본다',
      '2회차에 만든 도구를 GitHub 비공개 저장소에 올린다',
    ],
    output: '커밋 이력이 있는 내 프로젝트, GitHub 저장소',
    tools: ['Git', 'GitHub'],
    color: '#6d28d9',
  },
  {
    n: 4,
    slug: '/sessions/4',
    title: '웹앱으로 키우고 Vercel로 배포하기',
    short: '링크로 공유하기',
    minutes: 40,
    stage: '서버',
    oneLiner: '내 PC에만 있던 도구가 링크 하나로 동료에게 간다.',
    goals: [
      '로컬 도구와 서버에 올린 도구의 차이를 안다',
      'Claude Code로 웹앱을 만들고 내 PC에서 띄워 본다 (localhost)',
      'GitHub → Vercel 연결로 배포하고, 수정이 자동 반영되는 것을 확인한다',
    ],
    output: '동료에게 링크로 공유하는 웹 도구',
    tools: ['Next.js', 'Vercel'],
    color: '#047857',
  },
  {
    n: 5,
    slug: '/sessions/5',
    title: '데이터베이스 붙이기: 접수·신청형 업무 앱',
    short: '데이터 저장하기',
    minutes: 40,
    stage: '데이터',
    oneLiner: '데이터베이스는 여러 사람이 동시에 쓰는 공유 엑셀이다. 단, 문단속을 해야 한다.',
    goals: [
      '테이블·행·열을 엑셀에 빗대어 설명할 수 있다',
      'Supabase 프로젝트를 만들고 웹앱과 연결한다',
      '환경변수와 행 수준 보안(RLS)이 왜 필요한지 안다',
    ],
    output: '화면에서 추가·수정되는 공모 보드 (또는 행사 신청 앱)',
    tools: ['Supabase', 'Neon(대안)'],
    color: '#b45309',
  },
  {
    n: 6,
    slug: '/sessions/6',
    title: 'AI API로 지능형 업무 도구 만들기 + 안전하게 쓰기',
    short: 'AI 기능 넣기',
    minutes: 40,
    stage: 'AI',
    oneLiner: 'Claude Code는 만드는 AI, Claude API는 내 앱 안에서 일하는 AI다.',
    goals: [
      'Claude Code와 Claude API의 역할 차이를 안다',
      'API 키를 안전하게 발급·보관하고, 비용을 어림잡을 수 있다',
      '업무 앱에 요약·추출·분류 기능을 넣는다',
      '기관에서 AI 도구를 운영할 때의 보안·거버넌스 기준을 안다',
    ],
    output: '공고문 자동 추출·등록 기능',
    tools: ['Claude API', '환경변수'],
    color: '#be123c',
  },
];

export const getSession = (n: number) => sessions.find((s) => s.n === n)!;
