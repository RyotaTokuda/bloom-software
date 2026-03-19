# Mankai Software

ポートフォリオサイト + 開発ダッシュボード

## 開発ルール

### ダッシュボード変更後の反映手順（必須）
ダッシュボード（app/dashboard/）を変更した後は、**必ず**以下を実行すること:

```bash
# 1. devサーバーを停止
lsof -ti :3000 | xargs kill 2>/dev/null

# 2. .nextキャッシュを削除（Turbopackキャッシュ問題の回避）
rm -rf .next

# 3. devサーバーを再起動
NEXT_PUBLIC_STAGE=development npx next dev --port 3000 &

# 4. 表示確認
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/dashboard
```

**理由:** Turbopackのキャッシュが古いコードを返すことがある。`.next`削除で確実に反映される。

### 環境分離
- `NEXT_PUBLIC_STAGE=production` → ダッシュボードは非表示（Not found）
- `NEXT_PUBLIC_STAGE=development` → ダッシュボード表示
- ダッシュボードは**絶対に**本番に出さない

### デプロイ
- Vercel自動デプロイ（mainブランチpush時）
- 本番環境変数: Vercelダッシュボードで `NEXT_PUBLIC_STAGE=production` 設定済み
