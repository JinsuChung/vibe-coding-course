-- 공모 보드 테이블 (5회차)
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여 넣고 Run 하세요.

create table if not exists public.grants (
  id          bigint generated always as identity primary key,
  title       text not null,                 -- 사업명
  agency      text,                          -- 주관기관
  deadline    date not null,                 -- 마감일 (날짜로 저장해야 D-day 계산·정렬이 됨)
  owner       text,                          -- 담당자
  created_by  uuid default auth.uid(),       -- 등록한 사람 (로그인 사용자 id, 자동)
  created_at  timestamptz not null default now()
);

-- 행 수준 보안(RLS) 켜기: 켜지 않으면 공개 키만으로 누구나 모든 행을 고치고 지울 수 있다
alter table public.grants enable row level security;

-- 정책 1: 누구나 읽기
create policy "누구나 읽기" on public.grants
  for select to anon, authenticated using (true);

-- 정책 2: 로그인한 직원만 추가
create policy "로그인한 직원만 추가" on public.grants
  for insert to authenticated with check (true);

-- 정책 3: 등록한 본인만 수정
create policy "등록한 본인만 수정" on public.grants
  for update to authenticated using (created_by = auth.uid()) with check (created_by = auth.uid());

-- 정책 4: 등록한 본인만 삭제
create policy "등록한 본인만 삭제" on public.grants
  for delete to authenticated using (created_by = auth.uid());

-- 교육용 가상 데이터 10건 (SQL Editor는 관리자 권한으로 실행되므로 RLS와 상관없이 들어감)
insert into public.grants (title, agency, deadline, owner) values
  ('2026 지역혁신 산학협력 지원사업', '가상혁신진흥원', '2026-11-14', '김산단'),
  ('국가R&D 기초연구 신규과제', '가상연구재단', '2026-10-28', '이협력'),
  ('기업 수요기반 공동연구', '가온테크', '2026-12-05', '박연구'),
  ('청년 연구인력 채용지원', '가상산업원', '2026-10-20', '김산단'),
  ('대학 기술사업화 촉진사업', '가상기술원', '2026-11-30', '최기술'),
  ('바이오헬스 실증 연구', '나래바이오', '2027-01-15', '정바이오'),
  ('탄소중립 소재 개발', '다올소재', '2026-12-19', '이협력'),
  ('로봇 서비스 리빙랩', '라온로보틱스', '2026-11-07', '박연구'),
  ('공공데이터 활용 창업지원', '가상데이터진흥원', '2026-10-31', '한데이터'),
  ('스마트팜 현장 연구', '새솔푸드', '2027-02-02', '최기술');
