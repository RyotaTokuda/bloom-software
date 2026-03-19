"use client";

import Link from "next/link";
import { useState } from "react";

// 開発環境のみ表示
const isProduction = process.env.NEXT_PUBLIC_STAGE === "production";

// ============================================================
// プロジェクトデータ
// ============================================================

type ProjectStatus = "live" | "review" | "dev" | "planned";
type RevenueModel = "subscription" | "paid_article" | "affiliate" | "ads" | "none";

interface Project {
  id: string;
  name: string;
  emoji: string;
  status: ProjectStatus;
  statusLabel: string;
  progress: number; // 0-100
  revenueModel: RevenueModel;
  revenueModelLabel: string;
  monthlyTarget: number;
  currentMonthly: number;
  pricing?: string;
  pricingFunnel?: string;
  retention?: string;
  weakPoints: string[];
  nextActions: string[];
  metrics: {
    label: string;
    value: string;
    trend?: "up" | "down" | "flat";
  }[];
  aiSuggestions: string[];
}

const PROJECTS: Project[] = [
  {
    id: "note-writer",
    name: "NOTE Writer（ゆき）",
    emoji: "📝",
    status: "live",
    statusLabel: "稼働中",
    progress: 85,
    revenueModel: "paid_article",
    revenueModelLabel: "有料記事 + マガジン + アフィリエイト",
    monthlyTarget: 50000,
    currentMonthly: 0,
    pricing: "有料記事: 300〜500円 / マガジン: 980円 / アフィリ: Amazon tag=yukikurashi-22",
    pricingFunnel: "Google検索 → はてなブログ(無料+アフィリ) → NOTE誘導 → 無料記事(ファン化) → 有料記事 → マガジン",
    retention: "シリーズ化、ペルソナの一貫性、記事末尾の次回予告、マガジンまとめ買い",
    weakPoints: [
      "NOTE headless投稿がサーバーで動くか未検証",
      "X連携がAPI審査落ちで停止中",
      "はてなブログのSEO流入が立つまで2〜3ヶ月かかる",
      "記事がまだ9本しかない（目標20本で種まき完了）",
    ],
    nextActions: [
      "明日のGitHub Actions結果を確認",
      "NOTE headless投稿が失敗したらxvfb対応",
      "30記事到達後にNOTEマガジン作成",
    ],
    metrics: [
      { label: "はてなブログ記事数", value: "9本", trend: "up" },
      { label: "NOTE記事数", value: "7本", trend: "up" },
      { label: "NOTEフォロワー", value: "1人", trend: "flat" },
      { label: "有料記事", value: "1本（300円）", trend: "flat" },
      { label: "今月売上", value: "¥0", trend: "flat" },
      { label: "GitHub Actions", value: "稼働中", trend: "up" },
    ],
    aiSuggestions: [
      "ASP登録（A8.net/もしも）が未完了。はてなブログにアフィリリンクを貼れない状態",
      "NOTEの有料記事が1本しかない。種まき後は3記事に1本を有料にする設計だが、まだ種まき中",
      "はてなブログとNOTEで同じトピックから異なる記事を生成する設計は完成。品質検証が必要",
      "X連携が停止中。手動ツイートでもいいので、少なくとも週3回はブログリンクを投稿すべき",
    ],
  },
  {
    id: "web-media-engine",
    name: "Web Media Engine（くらべるラボ）",
    emoji: "🔬",
    status: "live",
    statusLabel: "稼働中",
    progress: 75,
    revenueModel: "affiliate",
    revenueModelLabel: "アフィリエイト（会計ソフト/保険/AI/Amazon）",
    monthlyTarget: 70500,
    currentMonthly: 0,
    pricing: "会計ソフト¥12,000/件、自動車保険¥3,000/件、AIツール¥2,500/件、Amazon¥250/件",
    pricingFunnel: "Google検索 → 収益記事(アフィリリンク) / 集客記事 → 内部リンク → 収益記事",
    retention: "SEOで継続流入。記事の定期更新でランキング維持",
    weakPoints: [
      "ASP案件が未契約（freee/自動車保険）→ 収益ゼロのまま",
      "ドメイン(kuraberu-lab.com)のDNS未設定",
      "Search Console未登録 → SEO状況が把握できない",
      "記事数がまだ0本（自動生成は開始済み）",
    ],
    nextActions: [
      "A8.net/もしもアフィリエイト/アクセストレードに登録",
      "freee・自動車保険見積りの案件を申請",
      "DNS設定してドメインを有効化",
      "Search Console登録",
    ],
    metrics: [
      { label: "公開記事数", value: "0本", trend: "flat" },
      { label: "月間PV", value: "0", trend: "flat" },
      { label: "ASP契約", value: "未登録", trend: "flat" },
      { label: "ドメイン", value: "DNS未設定", trend: "flat" },
      { label: "GitHub Actions", value: "稼働中", trend: "up" },
    ],
    aiSuggestions: [
      "記事自動生成は動いているが、ASP未登録のため収益化できない。最優先で登録すべき",
      "副業手取り計算ツールの開発が計画にある。SEOキーワード「副業 手取り 計算」は検索ボリューム大",
      "確定申告シーズン（1-3月）に向けた記事群の準備を前倒しで進めるべき",
    ],
  },
  {
    id: "parking-reader",
    name: "駐車料金リーダー",
    emoji: "🅿️",
    status: "review",
    statusLabel: "ストア審査待ち",
    progress: 90,
    revenueModel: "subscription",
    revenueModelLabel: "サブスクリプション（3段階）",
    monthlyTarget: 20000,
    currentMonthly: 0,
    pricing: "無料 / 1日パス ¥160 / 月額プレミアム ¥350",
    pricingFunnel: "App Store検索 → 無料DL → 1回使用で価値を実感 → 1日パス購入 → 常用ユーザーが月額へ",
    retention: "駐車のたびに使う日常ツール。一度使い始めると手放せない設計",
    weakPoints: [
      "Apple Developer Program承認がブロッカー（3/16申請済み）",
      "Gemini APIの無料枠に依存（ユーザー増加時のコスト問題）",
    ],
    nextActions: [
      "Apple Developer承認を待つ",
      "承認後: EAS Build → TestFlight → App Store/Google Play申請",
    ],
    metrics: [
      { label: "開発進捗", value: "Phase 1-3 完了", trend: "up" },
      { label: "Apple Developer", value: "申請中（3/16〜）", trend: "flat" },
      { label: "課金実装", value: "RevenueCat済み", trend: "up" },
    ],
    aiSuggestions: [
      "Apple承認が下りるまでの間に、ランディングページやスクリーンショットを準備しておくべき",
      "Gemini APIの無料枠（250RPD）でユーザー数の上限がある。月額課金ユーザーにはGemini Pro（有料）を使う設計を検討",
    ],
  },
  {
    id: "shimedoki",
    name: "しめどき",
    emoji: "⏰",
    status: "dev",
    statusLabel: "MVP完了",
    progress: 80,
    revenueModel: "subscription",
    revenueModelLabel: "Free / Plus（月額/年額）",
    monthlyTarget: 5000,
    currentMonthly: 0,
    pricing: "無料（3テンプレ/7日履歴） / Plus（月額/年額、無制限）",
    pricingFunnel: "App Store → 無料DL → 会議で使って便利さを実感 → Plus購入",
    retention: "毎回の会議で使う。習慣化すれば解約しない",
    weakPoints: [
      "Xcodeが未インストール → テストもビルドもできない",
      "ニッチすぎて市場が小さい可能性",
    ],
    nextActions: [
      "Xcodeインストール",
      "実機テスト（iPhone + Apple Watch）",
      "App Store申請",
    ],
    metrics: [
      { label: "開発進捗", value: "MVP実装済み", trend: "up" },
      { label: "テスト", value: "未テスト", trend: "flat" },
    ],
    aiSuggestions: [
      "Apple Watch対応アプリは競合が少ない。ニッチだがファーストムーバーアドバンテージがある",
      "駐車料金リーダーと同時にApp Store申請すれば効率的",
    ],
  },
  {
    id: "done-log",
    name: "DoneLog",
    emoji: "✅",
    status: "dev",
    statusLabel: "MVP完了",
    progress: 75,
    revenueModel: "subscription",
    revenueModelLabel: "Free / Plus（無制限ボタン/履歴）",
    monthlyTarget: 5000,
    currentMonthly: 0,
    pricing: "無料（8ボタン/14日履歴） / Plus（無制限）",
    pricingFunnel: "App Store → 無料DL → 日常で使う → 8ボタン上限に達する → Plus購入",
    retention: "毎日使うライフログ。データが溜まるほど解約しにくい",
    weakPoints: [
      "Xcodeが未インストール → テストもビルドもできない",
      "しめどきと同じブロッカー",
    ],
    nextActions: [
      "Xcodeインストール",
      "実機テスト",
      "App Store申請",
    ],
    metrics: [
      { label: "開発進捗", value: "Phase 3完了", trend: "up" },
      { label: "テスト", value: "未テスト", trend: "flat" },
    ],
    aiSuggestions: [
      "習慣トラッカー系アプリは競合が多い。差別化ポイント（ワンタップの簡便さ）を訴求すべき",
    ],
  },
  {
    id: "file-converter",
    name: "ローカルファイル変換",
    emoji: "🔄",
    status: "dev",
    statusLabel: "MVP完了・未デプロイ",
    progress: 70,
    revenueModel: "ads",
    revenueModelLabel: "広告（将来的に）",
    monthlyTarget: 3000,
    currentMonthly: 0,
    pricing: "無料（広告あり）",
    pricingFunnel: "Google検索「HEIC 変換」→ ツール使用 → 広告表示",
    retention: "必要な時だけ使うツール。SEOで継続流入",
    weakPoints: [
      "Vercelに未デプロイ（コマンド1つでできるのに放置）",
      "収益モデルが弱い（広告のみ）",
      "動画変換が未実装",
    ],
    nextActions: [
      "Vercelデプロイ（5分で完了）",
      "動画変換(ffmpeg.wasm)の追加",
    ],
    metrics: [
      { label: "デプロイ", value: "未デプロイ", trend: "flat" },
    ],
    aiSuggestions: [
      "デプロイだけなら5分。放置するメリットがない。今すぐデプロイすべき",
      "「HEIC 変換 オンライン」はSEO競合が激しい。ニッチKW（「HEIC 変換 サーバー送信なし」）で差別化",
    ],
  },
  {
    id: "home-stock",
    name: "おうちストック",
    emoji: "🏠",
    status: "dev",
    statusLabel: "開発中",
    progress: 20,
    revenueModel: "subscription",
    revenueModelLabel: "Free / Paid",
    monthlyTarget: 3000,
    currentMonthly: 0,
    pricing: "無料（1モード/制限あり） / 有料（全機能解放）",
    pricingFunnel: "App Store → 無料DL → 登録アイテムが増える → 無料上限 → 有料",
    retention: "日用品の買い物サイクルに組み込まれれば解約されない",
    weakPoints: [
      "テンプレートだけでMVP機能が未実装",
      "類似アプリが多い（在庫管理系）",
    ],
    nextActions: [
      "MVP機能実装（アイテム登録/通知/一覧）",
    ],
    metrics: [
      { label: "開発進捗", value: "テンプレのみ", trend: "flat" },
    ],
    aiSuggestions: [
      "優先度を下げて、収益直結のプロジェクト（ASP登録、駐車料金リーダー）に集中すべき",
    ],
  },
  {
    id: "car-cost-sim",
    name: "車の維持費シミュレーター",
    emoji: "🧮",
    status: "planned",
    statusLabel: "計画中",
    progress: 5,
    revenueModel: "affiliate",
    revenueModelLabel: "アフィリエイト（自動車保険/ローン）",
    monthlyTarget: 20000,
    currentMonthly: 0,
    pricing: "無料ツール → 結果画面でアフィリエイト誘導",
    pricingFunnel: "Google検索「車 維持費 計算」→ ツール使用 → 結果画面に保険見積りリンク",
    retention: "SEOで継続流入。ツール自体は1回使用",
    weakPoints: [
      "未着手",
      "Web Media Engineとの連携設計が必要",
    ],
    nextActions: [
      "web-media-engineの自動車保険テーマと連携設計",
      "実装（Next.js、クライアントサイドのみ）",
    ],
    metrics: [],
    aiSuggestions: [
      "web-media-engineの自動車保険アフィリエイトと組み合わせると月1〜3万円の可能性。Phase 2以降で着手",
    ],
  },
];

// ============================================================
// ダッシュボードコンポーネント
// ============================================================

const statusColors: Record<ProjectStatus, string> = {
  live: "bg-emerald-500",
  review: "bg-blue-500",
  dev: "bg-orange-500",
  planned: "bg-gray-400",
};

const trendIcons: Record<string, string> = {
  up: "↑",
  down: "↓",
  flat: "→",
};

const trendColors: Record<string, string> = {
  up: "text-emerald-500",
  down: "text-red-500",
  flat: "text-gray-400",
};

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<"overview" | "revenue" | "suggestions">("overview");

  if (isProduction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Not found</p>
      </div>
    );
  }

  const totalTarget = PROJECTS.reduce((s, p) => s + p.monthlyTarget, 0);
  const totalCurrent = PROJECTS.reduce((s, p) => s + p.currentMonthly, 0);
  const allSuggestions = PROJECTS.flatMap((p) =>
    p.aiSuggestions.map((s) => ({ project: p.name, emoji: p.emoji, suggestion: s }))
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* ヘッダー */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm">
              &larr; サイトに戻る
            </Link>
            <span className="text-gray-600">|</span>
            <h1 className="text-lg font-bold">Dev Dashboard</h1>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">
              DEV ONLY
            </span>
          </div>
          <div className="flex gap-2">
            {(["overview", "revenue", "suggestions"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  view === v
                    ? "bg-gray-700 text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {v === "overview" ? "全体" : v === "revenue" ? "収益" : "提案"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* サマリーカード */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <SummaryCard label="プロジェクト数" value={`${PROJECTS.length}`} sub={`稼働中: ${PROJECTS.filter((p) => p.status === "live").length}`} />
          <SummaryCard label="月間売上目標" value={`¥${totalTarget.toLocaleString()}`} sub="全プロジェクト合計" />
          <SummaryCard label="現在の月間売上" value={`¥${totalCurrent.toLocaleString()}`} sub={totalTarget > 0 ? `達成率: ${Math.round((totalCurrent / totalTarget) * 100)}%` : ""} />
          <SummaryCard label="要対応事項" value={`${allSuggestions.length}`} sub="AI提案" />
        </div>

        {view === "overview" && (
          <>
            {/* プロジェクト一覧 */}
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              全プロジェクト
            </h2>
            <div className="space-y-3 mb-8">
              {PROJECTS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(selectedProject?.id === p.id ? null : p)}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.emoji}</span>
                      <div>
                        <h3 className="font-bold text-sm">{p.name}</h3>
                        <span className={`inline-block text-xs px-2 py-0.5 rounded-full text-white mt-0.5 ${statusColors[p.status]}`}>
                          {p.statusLabel}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">月間目標</div>
                      <div className="font-bold text-sm">¥{p.monthlyTarget.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* プログレスバー */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${p.progress >= 80 ? "bg-emerald-500" : p.progress >= 50 ? "bg-orange-500" : "bg-gray-500"}`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-10 text-right">{p.progress}%</span>
                  </div>

                  {/* 展開時の詳細 */}
                  {selectedProject?.id === p.id && (
                    <div className="mt-5 pt-5 border-t border-gray-800 space-y-5">
                      {/* 課金設定 */}
                      {p.pricing && (
                        <DetailSection title="課金設定" content={p.pricing} />
                      )}
                      {p.pricingFunnel && (
                        <DetailSection title="課金動線" content={p.pricingFunnel} />
                      )}
                      {p.retention && (
                        <DetailSection title="継続率の維持" content={p.retention} />
                      )}

                      {/* メトリクス */}
                      {p.metrics.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">メトリクス</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {p.metrics.map((m, i) => (
                              <div key={i} className="bg-gray-800/50 rounded-lg px-3 py-2">
                                <div className="text-xs text-gray-500">{m.label}</div>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium">{m.value}</span>
                                  {m.trend && (
                                    <span className={`text-xs ${trendColors[m.trend]}`}>
                                      {trendIcons[m.trend]}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 弱点 */}
                      {p.weakPoints.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-red-400 uppercase mb-2">弱点・ブロッカー</h4>
                          <ul className="space-y-1">
                            {p.weakPoints.map((w, i) => (
                              <li key={i} className="text-xs text-red-300/80 flex gap-2">
                                <span className="text-red-500 shrink-0">!</span>
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 次のアクション */}
                      {p.nextActions.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-blue-400 uppercase mb-2">次のアクション</h4>
                          <ul className="space-y-1">
                            {p.nextActions.map((a, i) => (
                              <li key={i} className="text-xs text-blue-300/80 flex gap-2">
                                <span className="text-blue-500 shrink-0">&rarr;</span>
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {view === "revenue" && (
          <>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              収益構造
            </h2>
            <div className="space-y-4 mb-8">
              {PROJECTS.filter((p) => p.monthlyTarget > 0).sort((a, b) => b.monthlyTarget - a.monthlyTarget).map((p) => (
                <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{p.emoji}</span>
                      <span className="font-bold text-sm">{p.name}</span>
                    </div>
                    <span className="font-bold">¥{p.monthlyTarget.toLocaleString()}/月</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{p.revenueModelLabel}</div>
                  {p.pricing && <div className="text-xs text-gray-400 mb-2">設定: {p.pricing}</div>}
                  {p.pricingFunnel && (
                    <div className="text-xs text-gray-500 bg-gray-800/50 rounded-lg p-3 mt-2">
                      <span className="text-gray-400 font-medium">動線: </span>{p.pricingFunnel}
                    </div>
                  )}
                  {/* 進捗バー（目標達成率） */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500"
                        style={{ width: `${p.monthlyTarget > 0 ? Math.min((p.currentMonthly / p.monthlyTarget) * 100, 100) : 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      ¥{p.currentMonthly.toLocaleString()} / ¥{p.monthlyTarget.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              <div className="bg-gray-800 rounded-xl p-5 text-center">
                <div className="text-xs text-gray-500 mb-1">月間売上目標合計</div>
                <div className="text-2xl font-bold">¥{totalTarget.toLocaleString()}</div>
              </div>
            </div>
          </>
        )}

        {view === "suggestions" && (
          <>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              AI提案 — 今やるべきこと
            </h2>
            <div className="space-y-3">
              {allSuggestions.map((s, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-3">
                  <span className="text-xl shrink-0">{s.emoji}</span>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{s.project}</div>
                    <div className="text-sm text-gray-300">{s.suggestion}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function SummaryCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-bold">{value}</div>
      {sub && <div className="text-xs text-gray-600 mt-0.5">{sub}</div>}
    </div>
  );
}

function DetailSection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">{title}</h4>
      <p className="text-xs text-gray-400">{content}</p>
    </div>
  );
}
