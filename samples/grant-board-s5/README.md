# 공모 D-day 보드 — 5회차 완성본 (Supabase)

4회차 공모 보드에 Supabase 데이터베이스를 연결한 버전입니다.
누구나 목록을 볼 수 있고, 로그인한 담당자만 공모를 등록할 수 있으며, 등록한 본인만 삭제할 수 있습니다.

## 준비 (약 10분)

1. **Supabase 프로젝트 만들기** — https://supabase.com 대시보드에서 New project (리전: Northeast Asia (Seoul)). 데이터베이스 비밀번호는 직접 입력하고 따로 보관하세요.
2. **테이블 만들기** — 왼쪽 메뉴 **SQL Editor**에 `supabase/schema.sql` 내용을 통째로 붙여 넣고 **Run**. **Table Editor**에서 `grants` 표와 가상 데이터 10건을 확인합니다.
3. **담당자 계정 만들기** — **Authentication → Users → Add user → Create new user**. 이메일과 비밀번호를 정하고 "Auto Confirm User"를 켭니다.
4. **연결 정보 넣기** — `.env.local.example`을 복사해 `.env.local`로 이름을 바꾸고, **Project Settings → API**의 Project URL과 공개 키(anon/publishable)를 넣습니다. 비밀 키(service_role)는 넣지 않습니다.
5. **실행**

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 열고, 3번에서 만든 계정으로 로그인해 공모를 등록해 보세요.

## 배포 (Vercel)

GitHub에 올린 뒤 Vercel에서 Import하고, **Settings → Environment Variables**에 `.env.local`과 같은 두 값을 등록한 다음 다시 배포합니다.

## 확인해 볼 것 (보안)

- 로그아웃 상태에서는 등록 폼이 보이지 않고, 억지로 요청해도 RLS 정책이 막습니다.
- 다른 사람이 등록한 공모는 삭제되지 않습니다 (정책 4).
- Claude Code에게: `이 앱의 보안 설정을 점검해줘. 키가 코드에 노출돼 있거나, RLS 없이 누구나 쓸 수 있는 테이블이 있는지 확인해줘.`

교육용 가상 데이터입니다.
