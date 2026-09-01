// ────────────────────────────────────────────
//  설정 파일 — Supabase 프로젝트 정보
// ────────────────────────────────────────────

const SUPABASE_URL = 'https://odkkttxcnuxviudrwmpy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ka2t0dHhjbnV4dml1ZHJ3bXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzY4NjUsImV4cCI6MjA5NTUxMjg2NX0.6K2N9HNy_OJL9mFucHtpWDOIX4erZupg9sNdp4AiQ-Q';

// 이 빌드가 담당하는 학년 (6/8/10학년 앱은 이 값만 다르게 만들면 됨)
const GRADE = '10';

// 아이디 로그인을 위해 내부적으로 붙이는 가짜 이메일 도메인.
// 학년별로 분리해서 다른 학년 앱과 아이디가 겹쳐도 충돌하지 않음.
const EMAIL_DOMAIN = '@g' + GRADE + '.hankkorean.app';
