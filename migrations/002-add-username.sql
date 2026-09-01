-- 아이디/비밀번호 로그인 전환: profiles에 username 컬럼 추가
alter table profiles add column if not exists username text;
create unique index if not exists profiles_username_grade_unique on profiles (grade, username);
