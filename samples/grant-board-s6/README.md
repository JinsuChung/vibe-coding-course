# 공모 D-day 보드 — 6회차 완성본 (Supabase + Claude API)

5회차 완성본에 **공고문으로 등록** 기능을 더한 버전입니다.
공고문을 붙여 넣으면 서버가 Claude API로 사업명·주관기관·마감일·지원자격을 뽑아 등록 폼을 채우고, 담당자가 확인한 뒤 저장합니다.

## 준비

5회차 준비(Supabase 프로젝트, `supabase/schema.sql` 실행, 담당자 계정)를 먼저 마치세요. 그다음:

1. [Claude Console](https://platform.claude.com)에서 크레딧을 충전하고 **월 사용 한도를 먼저 설정**한 뒤 API 키를 발급합니다.
2. `.env.local.example`을 복사해 `.env.local`을 만들고 Supabase 두 값과 `ANTHROPIC_API_KEY`를 넣습니다. 키는 채팅창에 붙여 넣지 말고 파일에 직접 넣으세요.
3. 실행

```bash
npm install
npm run dev
```

로그인 → **공고문으로 등록**에 공고문을 붙여 넣고 **AI로 항목 뽑기** → 아래 등록 폼의 값을 확인·수정 → **저장**.

## 어떻게 동작하나요

| 파일 | 하는 일 |
| --- | --- |
| `app/api/extract/route.ts` | 서버에서만 실행. 로그인 토큰 확인 → Claude API 호출 → 정해진 항목만 JSON으로 받아 돌려줌 |
| `components/extract-panel.tsx` | 공고문 입력칸과 결과 안내. 결과를 등록 폼에 채움 |
| `components/board.tsx` | 목록, 로그인, 등록 폼 (5회차와 같음) |

- **모델:** Claude Sonnet 5.5 (`claude-sonnet-5-5`), 추출 작업이라 `effort: 'low'`로 빠르고 저렴하게.
- **안전 정책 대비:** 드물게 AI가 안전 정책으로 요청을 거절하면 서버가 다른 모델로 자동 재시도합니다(`fallbacks: 'default'`, Claude API 전용 베타 기능). 필요 없으면 `betas`와 `fallbacks` 두 줄을 지워도 됩니다.
- **결과 모양 고정:** `output_config.format`의 JSON 스키마로 항상 같은 항목만 받습니다.

## 안전장치 (6회차 보안 원칙)

- **API 키는 서버에서만:** `ANTHROPIC_API_KEY`는 `NEXT_PUBLIC_`이 붙지 않아 브라우저로 내려가지 않습니다.
- **로그인한 담당자만 호출:** 로그인하지 않은 사람이 내 키로 과금시키지 못하게 Supabase 로그인 토큰을 서버에서 확인합니다.
- **공고문은 데이터로만:** 공고문을 `<notice>` 태그로 감싸고, 안의 지시는 따르지 말라고 명시합니다. 지시문으로 의심되는 문장이 있으면 화면에 경고합니다 (6회차 자료의 공고문 3번으로 시험해 보세요).
- **저장은 사람이:** AI는 폼만 채우고, 저장 버튼은 담당자가 누릅니다. 날짜 형식이 아니면 서버가 비워 둡니다.
- **입력 길이 제한:** 2만 자가 넘는 공고문은 받지 않습니다.

## 배포 (Vercel)

Vercel **Settings → Environment Variables**에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY` 세 값을 등록하고 다시 배포합니다.

교육용 가상 데이터입니다.
