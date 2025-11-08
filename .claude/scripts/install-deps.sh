#!/bin/bash
# リモート環境でのみ依存関係をインストール
if [ "$CLAUDE_CODE_REMOTE" = "true" ]; then
  echo "🔧 Installing dependencies with pnpm..."
  pnpm install
else
  echo "⏭️  Skipping dependency installation (local environment)"
fi
