-- ────────────────────────────────────────────
--  Hank Korean App — Supabase 초기 설정
--  6/8/10학년을 같은 프로젝트에서 grade 컬럼으로 구분
--  Supabase Dashboard → SQL Editor 에서 전체 실행
-- ────────────────────────────────────────────

-- 1) 사용자 프로필 (역할/학년)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  role text not null default 'pending' check (role in ('pending', 'student', 'teacher')),
  grade text not null check (grade in ('6', '8', '10')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on profiles;
create policy "profiles_insert_own" on profiles
  for insert with check (auth.uid() = id);

-- role/grade 변경은 Supabase Dashboard(Table Editor)에서 선생님이 직접 승인
-- (서비스 키를 쓰는 대시보드는 RLS를 우회하므로 별도 update 정책 불필요)


-- 2) 단원 목록 (학년별)
create table if not exists units (
  id bigint generated always as identity primary key,
  grade text not null check (grade in ('6', '8', '10')),
  number int not null,
  title text not null,
  status text not null default 'planned' check (status in ('planned', 'active')),
  unique (grade, number)
);

alter table units enable row level security;

drop policy if exists "units_select_authenticated" on units;
create policy "units_select_authenticated" on units
  for select using (auth.role() = 'authenticated');

-- 10학년 기본 단원 시드
insert into units (grade, number, title, status) values
  ('10', 1, '생쥐와 인간', 'active'),
  ('10', 2, '인포그래픽', 'planned'),
  ('10', 3, '사랑에 속고 돈에 울고', 'planned'),
  ('10', 4, '영화', 'planned')
on conflict (grade, number) do nothing;


-- 3) 단원 내 콘텐츠 (학습목표/텍스트/이론/과제내용/Criteria/Rubric)
create table if not exists unit_content (
  id bigint generated always as identity primary key,
  grade text not null check (grade in ('6', '8', '10')),
  unit_number int not null,
  section text not null check (
    section in ('objectives', 'text', 'theory', 'task', 'criteria', 'rubric')
  ),
  content text default '',
  updated_at timestamptz not null default now(),
  unique (grade, unit_number, section)
);

alter table unit_content enable row level security;

drop policy if exists "unit_content_select_authenticated" on unit_content;
create policy "unit_content_select_authenticated" on unit_content
  for select using (auth.role() = 'authenticated');
