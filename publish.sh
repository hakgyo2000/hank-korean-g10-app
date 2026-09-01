#!/bin/bash
# ─────────────────────────────────────────
#  Hank Korean G10 App — 배포 스크립트
#  사용법: ./publish.sh
# ─────────────────────────────────────────

echo "🚀 Hank Korean G10 배포 시작"
echo ""

if [ -z "$GH_TOKEN" ]; then
  echo "❌ GH_TOKEN이 설정되지 않았습니다."
  echo ""
  echo "터미널에서 아래처럼 실행하세요:"
  echo "  export GH_TOKEN=ghp_your_token_here"
  echo "  ./publish.sh"
  exit 1
fi

VERSION=$(node -e "console.log(require('./package.json').version)")
echo "📦 현재 버전: v$VERSION"
echo ""

CSC_IDENTITY_AUTO_DISCOVERY=false \
npm run publish

echo ""
echo "✅ 배포 완료! GitHub Releases에서 확인하세요."
