# AGENTS.md

AI coding agents向けのプロジェクトガイドラインです。このブログサイトでコードを編集する際の重要な情報が含まれています。

## プロジェクト概要

Next.js 15.3.3 (App Router) を使用したMDXベースの技術ブログサイトです。
Cloudflare Workersにデプロイされ、日本語技術記事に特化した機能を持ちます。

## セットアップコマンド

**パッケージマネージャー:** pnpm

### 基本コマンド
```bash
# 依存関係インストール
pnpm install

# 開発サーバー起動（Turbopack使用）
pnpm dev

# プロダクションビルド
pnpm build

# Cloudflareにデプロイ
pnpm run deploy
```

### 開発・テストコマンド
```bash
# コードリンティング
pnpm lint

# コードフォーマット（--write付き）
pnpm format

# TypeScript型チェック
pnpm typecheck

# 日本語記事のlint
pnpm lint:post

# プレビューサーバー（OpenNext Cloudflare adapter）
pnpm preview

# バンドルサイズ分析
pnpm build:analyze
```

## コードスタイル

### Biome設定
- **Biome** を使用（ESLint/Prettierの代替）
- 行幅: 80文字
- インデント: 2スペース
- JSX引用符: ダブルクォート
- JavaScript引用符: シングルクォート
- 末尾カンマ: 常につける
- セミコロン: 常につける

### 必須チェック
コード変更後は必ず以下を実行：
```bash
pnpm lint && pnpm format && pnpm typecheck
```

### パフォーマンスルール
- img要素禁止（Next.js Imageを使用）
- 不要な再レンダリング回避
- 静的生成に最適化

## ブログ記事作成ルール

### 記事配置
- 全記事は `_posts/` ディレクトリに配置
- ファイル名: `YYYY-MM-DD-title.mdx`
- 例: `2024-03-30-my-first-post.mdx`

### 必須フロントマター
```yaml
---
title: "記事のタイトル"
description: "記事の概要説明"
date: "YYYY-MM-DD"
publishedTime: "YYYY-MM-DDTHH:mm:ssZ"
---
```

### オプション項目
- `modifiedTime`: 更新日時
- `tags`: タグ配列

### 記事構造ガイドライン
1. 見出し階層の適切な使用（h1 → h2 → h3）
2. コードブロックには言語を指定
3. 画像は `public/images/` に配置
4. 内部リンクは相対パス使用
5. OGP画像は自動生成（Route Handler経由）

## コンポーネント設計

### 主要コンポーネント
- `components/Layout.tsx`: ページ全体レイアウト
- `components/PostCard.tsx`: 記事カード表示（一貫したデザイン）
- `components/RelatedPosts.tsx`: 関連記事表示
- `components/MDXComponent.tsx`: Markdown記事レンダリング

### 設計原則
1. **再利用性**: 機能ごとに分割、共有可能な設計
2. **アクセシビリティ**: セマンティックHTML、適切なARIA属性
3. **一貫性**: 類似要素の統一スタイル
4. **TypeScript**: 厳密な型定義、明確なPropsインターフェース

### スタイル統一ルール
新規要素追加時は既存の色・余白・ボーダー・装飾を流用し、独自値の追加を避けて統一感を保つ。

## テスト手順

### 機能確認
1. `pnpm dev` で開発サーバー起動
2. Playwright MCPを使用してブラウザテスト実行
3. 全ページの表示確認
4. レスポンシブデザイン確認

### 品質チェック
```bash
# 全体チェック
pnpm lint && pnpm typecheck && pnpm build

# 日本語記事チェック
pnpm lint:post

# バンドルサイズチェック
pnpm build:analyze
```

## アーキテクチャ詳細

### 技術スタック
- **Next.js 15.3.3** + App Router
- **MDX** + カスタム処理パイプライン
- **Tailwind CSS** + カスタムタイポグラフィ
- **Shiki** シンタックスハイライト（Night Owlテーマ）
- **Cloudflare Workers** + OpenNext adapter

### ディレクトリ構造
```
src/
├── app/                    # Next.js App Router
│   ├── (root)/            # ルートページ
│   ├── about/             # About ページ
│   ├── posts/[slug]/      # 記事詳細ページ
│   └── tags/              # タグページ
├── components/            # 再利用可能コンポーネント
├── lib/                   # ユーティリティ関数
└── styles/               # グローバルスタイル
_posts/                   # MDX記事ファイル
public/                   # 静的アセット
```

### Content Pipeline
- **gray-matter**: フロントマター解析
- **rehype-slug** + **rehype-autolink-headings**: ナビゲーション
- **textlint**: 日本語技術文書校正

## デプロイメント

### Cloudflare設定
- 設定ファイル: `wrangler.jsonc`
- OpenNext設定: `open-next.config.ts`
- カスタムドメイン: `blog.thinceller.net`

### デプロイコマンド
```bash
# ビルド＆デプロイ
pnpm run deploy

# ビルド＆アップロードのみ
pnpm upload

# 環境型生成
pnpm cf-typegen
```

### パフォーマンス監視
- バンドルサイズ予算: 358KB
- 20%増加時に警告
- FontAwesome最適化有効

## 特別な考慮事項

### 日本語サポート
- **NOTONOTO35HS** フォント使用
- textlint日本語技術文書プリセット
- カスタムタイポグラフィ最適化

### アクセシビリティ
- focus-visible サポート
- キーボードナビゲーション
- セマンティックHTML

### SEO最適化
- 自動サイトマップ生成
- RSS/Atom フィード
- OGP画像自動生成
- 構造化データ

## セキュリティ

- 静的生成によるセキュリティリスク軽減
- Cloudflare Workers環境での実行
- 依存関係の定期更新（Renovate）

## トラブルシューティング

### よくある問題
1. **ビルドエラー**: `pnpm typecheck` で型エラーを確認
2. **スタイル問題**: Tailwind設定を確認
3. **MDX解析エラー**: フロントマターの形式を確認
4. **デプロイ失敗**: `wrangler.jsonc` 設定を確認

### デバッグ
- `pnpm build:analyze` でバンドルサイズ分析
- ブラウザ開発者ツールでパフォーマンス確認
- Cloudflare Workers logsでエラー確認
