# Hank Korean G10 — 설정 가이드

IB Korean A 10학년용 Electron 학습 앱. Supabase(인증/DB) + GitHub Releases(자동 업데이트) 구조는 Hank Teacher App(DP)과 동일하고, 디자인은 별도(아이보리 페이퍼 + 러스트 톤)로 분리했습니다.

## 1. Supabase 설정

1. `supabase-setup.sql` 내용을 Supabase Dashboard → SQL Editor에서 전체 실행
   (profiles / units / unit_content 테이블 생성, 10학년 기본 단원 4개 시드)
2. `renderer/config.js`에 이미 프로젝트 URL/anon key가 들어 있음 (6/8학년 앱을 만들 때도 같은 프로젝트를 재사용하고 `GRADE` 값만 바꾸면 됨)

## 2. 로컬 실행

```bash
npm install
npm start
```

## 3. 계정 승인 흐름

1. 앱에서 선생님 본인 계정으로 먼저 회원가입
2. Supabase Dashboard → Table Editor → `profiles` 테이블에서 본인 행의 `role`을 `teacher`로 변경
3. 앱 재시작 후 로그인 → 정상 진입 확인
4. 이후 학생 가입 건도 같은 방식으로 `role`을 `student`로 승인

## 4. 배포 (GitHub Releases + 자동 업데이트)

GitHub 저장소: `hakgyo2000/hank-korean-g10-app` (이미 생성됨)

```bash
export GH_TOKEN=ghp_your_token_here
./publish.sh
```

빌드는 macOS에서만 가능합니다 (코드사이닝 관련). 완료되면 Releases에 새 버전이 올라가고, 기존 사용자는 앱 실행 시 자동으로 업데이트를 받습니다.

## 5. 설치 페이지

`install-page/index.html`을 GitHub Pages로 올리면 학생/교사가 처음 앱을 받을 때 안내 페이지로 쓸 수 있습니다.

## 오늘 완성된 범위

- [x] Supabase 이메일/비밀번호 로그인·회원가입
- [x] 가입 시 `role: pending` 등록 → 승인 대기 화면
- [x] 승인 후(`student`/`teacher`) 메인 앱 진입
- [x] 사이드바: 1학기(Unit 1·2) / 2학기(Unit 3·4) 구분, Unit 클릭 시 학습목표/텍스트/이론/과제 서브메뉴
- [x] 과제 서브메뉴 내 과제내용/Criteria/Rubric pill 탭
- [x] 자동 업데이트 (electron-updater + GitHub Releases)
- [ ] 실제 콘텐츠 입력/편집 (다음 단계)
- [ ] Groq AI 기능 — 텍스트/이론 메뉴 (다음 단계)
