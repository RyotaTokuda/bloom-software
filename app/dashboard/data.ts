// ============================================================
// Dashboard Data — 個人開発プロジェクト管理
// ============================================================

export interface RevenueScenario {
  bad: number;
  normal: number;
  good: number;
  badNote: string;
  normalNote: string;
  goodNote: string;
}

export interface TodoItem {
  task: string;
  owner: "auto" | "manual";
  priority: "critical" | "high" | "medium" | "low";
  blocked?: string;
}

export interface KPI {
  label: string;
  target: number;
  actual: number;
  unit: string;
  period: string;
}

export interface Milestone {
  label: string;
  deadline: string;
  status: "done" | "in_progress" | "upcoming" | "overdue";
  note?: string;
}

export interface SystemHealth {
  name: string;
  status: "healthy" | "warning" | "error" | "unknown";
  lastCheck?: string;
  note?: string;
}

export interface Blocker {
  issue: string;
  impact: string;
  impactAmount?: string;
  action: string;
  owner: "manual" | "auto";
  estimatedMinutes?: number;
}

export interface RevenueRoadmap {
  month: string;
  target: number;
  actual: number;
  breakdown: { source: string; target: number; actual: number }[];
}

export interface ProjectData {
  id: string;
  name: string;
  emoji: string;
  status: "live" | "review" | "dev" | "planned";
  statusLabel: string;
  phase: string;

  kpis: KPI[];
  milestones: Milestone[];
  health: SystemHealth[];
  blockers: Blocker[];
  todos: TodoItem[];
  revenueRoadmap: RevenueRoadmap[];

  competitors: { name: string; users: string; pricing: string }[];
  currentMonthly: number;
  monthlyTarget: number;
  revenue: RevenueScenario;
  revenueModel: string;
}

// ============================================================
// プロジェクトデータ
// ============================================================

export const PROJECTS: ProjectData[] = [
  // ─── web-media-engine（くらべるラボ）───
  {
    id: "web-media-engine",
    name: "Web Media Engine（くらべるラボ）",
    emoji: "🔬",
    status: "live",
    statusLabel: "稼働中",
    phase: "Phase 1: 量で当たりを探す（月1-2）",
    kpis: [
      { label: "公開記事数", target: 25, actual: 10, unit: "本", period: "Phase 1目標" },
      { label: "月間検索表示", target: 8000, actual: 0, unit: "回", period: "月間" },
      { label: "月間検索クリック", target: 250, actual: 0, unit: "回", period: "月間" },
      { label: "検索CTR", target: 3.2, actual: 0, unit: "%", period: "月間" },
      { label: "アフィクリック数", target: 30, actual: 0, unit: "回", period: "月間" },
      { label: "月間売上", target: 0, actual: 0, unit: "円", period: "月間" },
    ],
    milestones: [
      { label: "リポジトリ・CLI構築", deadline: "2026-03-19", status: "done" },
      { label: "サイト公開・10記事投入", deadline: "2026-03-19", status: "done" },
      { label: "ASP登録（A8/もしも）", deadline: "2026-03-19", status: "done" },
      { label: "ドメイン取得・DNS設定", deadline: "2026-03-19", status: "done" },
      { label: "Search Console登録", deadline: "2026-03-20", status: "in_progress" },
      { label: "Cloudflare Analytics設定", deadline: "2026-03-20", status: "in_progress" },
      { label: "ASP案件提携申請（freee/Notta等）", deadline: "2026-03-22", status: "upcoming" },
      { label: "X(Twitter)アカウント開設", deadline: "2026-03-25", status: "upcoming" },
      { label: "25記事到達", deadline: "2026-04-15", status: "upcoming" },
      { label: "初成果（アフィリエイト1件）", deadline: "2026-04-30", status: "upcoming" },
      { label: "Phase 2移行判定", deadline: "2026-05-19", status: "upcoming" },
    ],
    health: [
      { name: "GitHub Actions（記事生成）", status: "warning", note: "Gemini API無料枠のRPM制限で失敗あり" },
      { name: "GitHub Actions（監査/レポート）", status: "healthy" },
      { name: "Cloudflare Pages", status: "healthy", note: "デプロイ正常" },
      { name: "Gemini API", status: "warning", note: "日次枠使い切りで429。明日リセット" },
      { name: "Search Console", status: "unknown", note: "未登録" },
      { name: "Cloudflare Analytics", status: "unknown", note: "未設定" },
    ],
    blockers: [
      { issue: "Search Console未登録", impact: "KPI計測不可", impactAmount: "検索CTR/表示回数が取れず改善サイクルが回らない", action: "search.google.com/search-console でサイト登録", owner: "manual", estimatedMinutes: 5 },
      { issue: "Cloudflare Analytics未設定", impact: "PVデータ取得不可", action: "Cloudflareダッシュボードでトークン取得", owner: "manual", estimatedMinutes: 3 },
      { issue: "ASP案件未提携", impact: "収益化不可", impactAmount: "記事にアフィリリンクを貼れない = 月¥70,500の機会損失", action: "A8/もしもで「freee」「Notta」「Canva」を検索して提携申請", owner: "manual", estimatedMinutes: 15 },
      { issue: "X未開設", impact: "SNS流入ゼロ", impactAmount: "SEOだけでは月5万達成が厳しい。競合はSEO+SNSの2本柱", action: "X(Twitter)アカウント作成、AIツール情報発信開始", owner: "manual", estimatedMinutes: 10 },
    ],
    todos: [
      { task: "Search Console登録 + サイト認証", owner: "manual", priority: "critical" },
      { task: "Cloudflare Web Analyticsトークン設定", owner: "manual", priority: "critical" },
      { task: "A8.netでfreee/会計ソフト案件を提携申請", owner: "manual", priority: "critical" },
      { task: "もしもでAIツール系案件を提携申請", owner: "manual", priority: "critical" },
      { task: "X(Twitter)アカウント開設・運用開始", owner: "manual", priority: "high" },
      { task: "記事の自動生成（毎日3本）", owner: "auto", priority: "high" },
      { task: "daily-audit: 記事監査・改善候補抽出", owner: "auto", priority: "high" },
      { task: "weekly-report: 週次KPIレポート", owner: "auto", priority: "high" },
      { task: "monthly-report: 月次分析", owner: "auto", priority: "medium" },
    ],
    revenueRoadmap: [
      { month: "2026-04", target: 0, actual: 0, breakdown: [{ source: "基盤構築期", target: 0, actual: 0 }] },
      { month: "2026-05", target: 8000, actual: 0, breakdown: [{ source: "AIツール", target: 5000, actual: 0 }, { source: "Amazon", target: 3000, actual: 0 }] },
      { month: "2026-06", target: 8000, actual: 0, breakdown: [{ source: "AIツール", target: 5000, actual: 0 }, { source: "Amazon", target: 3000, actual: 0 }] },
      { month: "2026-07", target: 15000, actual: 0, breakdown: [{ source: "AIツール", target: 8000, actual: 0 }, { source: "会計ソフト", target: 4000, actual: 0 }, { source: "Amazon", target: 3000, actual: 0 }] },
      { month: "2026-08", target: 15000, actual: 0, breakdown: [{ source: "AIツール", target: 8000, actual: 0 }, { source: "会計ソフト", target: 4000, actual: 0 }, { source: "Amazon", target: 3000, actual: 0 }] },
      { month: "2026-09", target: 25000, actual: 0, breakdown: [{ source: "AIツール", target: 12000, actual: 0 }, { source: "会計ソフト", target: 8000, actual: 0 }, { source: "Amazon", target: 5000, actual: 0 }] },
      { month: "2026-10", target: 35000, actual: 0, breakdown: [{ source: "AIツール", target: 15000, actual: 0 }, { source: "会計ソフト", target: 12000, actual: 0 }, { source: "Amazon", target: 8000, actual: 0 }] },
      { month: "2026-11", target: 50000, actual: 0, breakdown: [{ source: "AIツール", target: 20000, actual: 0 }, { source: "会計ソフト", target: 18000, actual: 0 }, { source: "Amazon", target: 12000, actual: 0 }] },
    ],
    competitors: [
      { name: "WEEL", users: "法人メディア", pricing: "コンサル誘導" },
      { name: "AIsmiley", users: "500製品掲載", pricing: "資料請求リード" },
      { name: "マイベスト", users: "数万記事", pricing: "ASPアフィリエイト" },
      { name: "SHIFT AI TIMES", users: "フォロワー10万", pricing: "コミュニティ販売" },
    ],
    currentMonthly: 0,
    monthlyTarget: 70500,
    revenue: {
      bad: 2000,
      normal: 25000,
      good: 70000,
      badNote: "SEOが弱く月間PV3,000以下。アフィリ成果が月1〜2件のみ",
      normalNote: "月間PV15,000、会計ソフト月1件(¥12,000)+AIツール月3件+Amazon月15件",
      goodNote: "月間PV40,000、会計ソフト月2件+保険3件+AIツール6件+Amazon30件",
    },
    revenueModel: "アフィリエイト（会計ソフト/保険/AI/Amazon）",
  },

  // ─── note-writer（ゆき）───
  {
    id: "note-writer",
    name: "NOTE Writer（ゆき）",
    emoji: "📝",
    status: "live",
    statusLabel: "稼働中",
    phase: "Phase 1: 記事蓄積・フォロワー獲得",
    kpis: [
      { label: "はてなブログ記事数", target: 20, actual: 9, unit: "本", period: "累計" },
      { label: "NOTE記事数", target: 15, actual: 7, unit: "本", period: "累計" },
      { label: "NOTEフォロワー", target: 50, actual: 1, unit: "人", period: "累計" },
      { label: "NOTE有料記事売上", target: 3000, actual: 0, unit: "円", period: "月間" },
      { label: "はてなアフィリエイト", target: 1000, actual: 0, unit: "円", period: "月間" },
    ],
    milestones: [
      { label: "はてなブログ・NOTE自動投稿構築", deadline: "2026-03-18", status: "done" },
      { label: "9記事投入（はてな）", deadline: "2026-03-19", status: "done" },
      { label: "7記事投入（NOTE）", deadline: "2026-03-19", status: "done" },
      { label: "ASP登録（A8/もしも）", deadline: "2026-03-20", status: "in_progress" },
      { label: "はてなブログ20記事到達", deadline: "2026-04-05", status: "upcoming" },
      { label: "NOTE15記事到達", deadline: "2026-04-05", status: "upcoming" },
      { label: "NOTEマガジン作成", deadline: "2026-04-10", status: "upcoming" },
      { label: "NOTEフォロワー50人", deadline: "2026-05-01", status: "upcoming" },
      { label: "初有料記事売上", deadline: "2026-05-15", status: "upcoming" },
    ],
    health: [
      { name: "GitHub Actions（記事生成）", status: "healthy", note: "毎日3トピック×2記事" },
      { name: "NOTE headless投稿", status: "warning", note: "サーバー環境で動作未検証" },
      { name: "はてなブログAPI", status: "healthy" },
      { name: "Gemini API", status: "warning", note: "日次枠上限あり" },
    ],
    blockers: [
      { issue: "NOTE headless投稿のサーバー検証未完了", impact: "NOTE自動投稿が止まる可能性", action: "GitHub Actions結果を確認、失敗時はxvfb対応", owner: "manual", estimatedMinutes: 15 },
      { issue: "ASP未登録", impact: "はてなブログにアフィリリンクが貼れない", impactAmount: "月¥1,000〜¥5,000の機会損失", action: "A8.net/もしもでアフィリエイト提携申請", owner: "manual", estimatedMinutes: 10 },
      { issue: "X連携停止中", impact: "SNS流入ゼロ", impactAmount: "フォロワー獲得速度が大幅に低下", action: "X API再申請 or 手動ツイート週3回", owner: "manual", estimatedMinutes: 10 },
    ],
    todos: [
      { task: "明日のGitHub Actions結果を確認", owner: "manual", priority: "critical" },
      { task: "A8.net/もしもでNOTE Writer向け案件を提携申請", owner: "manual", priority: "high" },
      { task: "NOTE headless投稿が失敗したらxvfb対応", owner: "auto", priority: "high" },
      { task: "30記事到達後にNOTEマガジン作成", owner: "manual", priority: "medium" },
      { task: "X API再申請 or 手動ツイート週3回", owner: "manual", priority: "medium" },
      { task: "記事の自動投稿（毎日3トピック×2記事）", owner: "auto", priority: "high" },
      { task: "週次PDCA分析（毎週日曜自動）", owner: "auto", priority: "high" },
    ],
    revenueRoadmap: [
      { month: "2026-04", target: 0, actual: 0, breakdown: [{ source: "記事蓄積期", target: 0, actual: 0 }] },
      { month: "2026-05", target: 3000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 2000, actual: 0 }, { source: "はてなアフィリ", target: 1000, actual: 0 }] },
      { month: "2026-06", target: 5000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 3000, actual: 0 }, { source: "はてなアフィリ", target: 2000, actual: 0 }] },
      { month: "2026-07", target: 8000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 5000, actual: 0 }, { source: "はてなアフィリ", target: 3000, actual: 0 }] },
      { month: "2026-08", target: 10000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 6000, actual: 0 }, { source: "マガジン", target: 2000, actual: 0 }, { source: "はてなアフィリ", target: 2000, actual: 0 }] },
      { month: "2026-09", target: 15000, actual: 0, breakdown: [{ source: "NOTE有料記事", target: 8000, actual: 0 }, { source: "マガジン", target: 4000, actual: 0 }, { source: "はてなアフィリ", target: 3000, actual: 0 }] },
    ],
    competitors: [
      { name: "note平均的クリエイター", users: "大多数", pricing: "月0〜5,000円" },
      { name: "note中堅層（継続発信）", users: "数万人", pricing: "月1万〜5万円" },
      { name: "noteトップ1000", users: "1,000人", pricing: "平均月126万円" },
    ],
    currentMonthly: 0,
    monthlyTarget: 50000,
    revenue: {
      bad: 3000,
      normal: 15000,
      good: 50000,
      badNote: "記事は溜まるがフォロワーが伸びず、有料記事が月10本しか売れない",
      normalNote: "フォロワー300人、有料記事月50本(CVR1%)、マガジン月5本。はてなアフィリ月2000円",
      goodNote: "フォロワー800人、有料記事月137本、マガジン月12本。はてなアフィリ月5000円",
    },
    revenueModel: "有料記事 + マガジン + アフィリエイト",
  },

  // ─── 駐車料金リーダー ───
  {
    id: "parking-reader",
    name: "駐車料金リーダー",
    emoji: "🅿️",
    status: "review",
    statusLabel: "ストア審査待ち",
    phase: "Phase 4: ストア公開",
    kpis: [
      { label: "開発進捗", target: 100, actual: 90, unit: "%", period: "累計" },
      { label: "App Store申請", target: 1, actual: 0, unit: "件", period: "累計" },
    ],
    milestones: [
      { label: "Phase 1-3 実装完了", deadline: "2026-03-15", status: "done" },
      { label: "Apple Developer申請", deadline: "2026-03-16", status: "done" },
      { label: "Apple Developer承認", deadline: "2026-03-23", status: "in_progress", note: "3/16申請済み" },
      { label: "EAS Build → TestFlight", deadline: "2026-03-25", status: "upcoming" },
      { label: "App Store申請", deadline: "2026-03-28", status: "upcoming" },
      { label: "Google Play同時申請", deadline: "2026-03-28", status: "upcoming" },
    ],
    health: [
      { name: "RevenueCat", status: "healthy", note: "課金実装済み" },
      { name: "Gemini API", status: "healthy", note: "料金解析用" },
    ],
    blockers: [
      { issue: "Apple Developer承認待ち", impact: "ストア公開不可", impactAmount: "公開が1日遅れるごとに機会損失", action: "Apple側の処理を待つ（3/16申請済み）", owner: "manual", estimatedMinutes: 0 },
    ],
    todos: [
      { task: "Apple Developer承認を待つ", owner: "manual", priority: "critical", blocked: "Apple側の処理待ち" },
      { task: "承認後: EAS Build", owner: "auto", priority: "high", blocked: "Apple Developer承認" },
      { task: "TestFlight → App Store申請", owner: "manual", priority: "high", blocked: "EAS Build" },
      { task: "Google Play同時申請", owner: "manual", priority: "high", blocked: "EAS Build" },
      { task: "ランディングページ/スクリーンショット準備", owner: "manual", priority: "medium" },
    ],
    revenueRoadmap: [
      { month: "2026-04", target: 0, actual: 0, breakdown: [{ source: "公開準備期", target: 0, actual: 0 }] },
      { month: "2026-05", target: 3000, actual: 0, breakdown: [{ source: "サブスク", target: 3000, actual: 0 }] },
      { month: "2026-06", target: 5000, actual: 0, breakdown: [{ source: "サブスク", target: 5000, actual: 0 }] },
    ],
    competitors: [
      { name: "PPPark!", users: "累計300万DL", pricing: "無料（広告）" },
      { name: "akippa", users: "会員450万人", pricing: "無料（予約手数料）" },
      { name: "タイムズ検索", users: "業界1位", pricing: "無料" },
    ],
    currentMonthly: 0,
    monthlyTarget: 20000,
    revenue: {
      bad: 1000, normal: 8000, good: 30000,
      badNote: "PPPark(300万DL,4.5★)が市場を支配。差別化できず月100DL以下",
      normalNote: "AI料金解析という独自機能で月500DL、課金率5%で25人×¥350",
      goodNote: "SNSやブログで話題になり月2000DL、課金率5%で100人×¥350",
    },
    revenueModel: "サブスクリプション（3段階）",
  },

  // ─── しめどき ───
  {
    id: "shimedoki",
    name: "しめどき",
    emoji: "⏰",
    status: "dev",
    statusLabel: "MVP完了",
    phase: "Phase 3: テスト・申請",
    kpis: [
      { label: "開発進捗", target: 100, actual: 80, unit: "%", period: "累計" },
    ],
    milestones: [
      { label: "MVP実装", deadline: "2026-03-14", status: "done" },
      { label: "Xcodeインストール", deadline: "2026-03-25", status: "upcoming" },
      { label: "実機テスト", deadline: "2026-03-28", status: "upcoming" },
      { label: "App Store申請", deadline: "2026-04-01", status: "upcoming" },
    ],
    health: [],
    blockers: [
      { issue: "Xcodeが未インストール", impact: "テスト不可", action: "Xcodeをインストール", owner: "manual", estimatedMinutes: 30 },
    ],
    todos: [
      { task: "Xcodeをインストール", owner: "manual", priority: "critical" },
      { task: "iPhone + Apple Watchで実機テスト", owner: "manual", priority: "high", blocked: "Xcode" },
      { task: "App Store申請", owner: "manual", priority: "high", blocked: "実機テスト" },
    ],
    revenueRoadmap: [],
    competitors: [
      { name: "Meeting Timer: Cost Tracking", users: "少数", pricing: "無料/有料" },
      { name: "Time Timer", users: "ブランド力あり", pricing: "$2.99〜" },
      { name: "Apple純正タイマー", users: "全ユーザー", pricing: "無料" },
    ],
    currentMonthly: 0,
    monthlyTarget: 5000,
    revenue: {
      bad: 0, normal: 3000, good: 10000,
      badNote: "市場が小さすぎてDL数が月50以下",
      normalNote: "ニッチだが競合なし。月200DL、課金率3%で6人×¥500",
      goodNote: "ビジネスパーソンに刺さり月500DL、課金率5%",
    },
    revenueModel: "Free / Plus（月額/年額）",
  },

  // ─── DoneLog ───
  {
    id: "done-log",
    name: "DoneLog",
    emoji: "✅",
    status: "dev",
    statusLabel: "MVP完了",
    phase: "Phase 3: テスト・申請",
    kpis: [
      { label: "開発進捗", target: 100, actual: 75, unit: "%", period: "累計" },
    ],
    milestones: [
      { label: "Phase 3 実装完了", deadline: "2026-03-14", status: "done" },
      { label: "Xcodeインストール", deadline: "2026-03-25", status: "upcoming" },
      { label: "実機テスト", deadline: "2026-03-28", status: "upcoming" },
      { label: "App Store申請", deadline: "2026-04-01", status: "upcoming" },
    ],
    health: [],
    blockers: [
      { issue: "Xcodeが未インストール", impact: "テスト不可", action: "Xcodeをインストール", owner: "manual", estimatedMinutes: 30 },
    ],
    todos: [
      { task: "Xcodeをインストール", owner: "manual", priority: "critical" },
      { task: "実機テスト", owner: "manual", priority: "high", blocked: "Xcode" },
      { task: "App Store申請", owner: "manual", priority: "high", blocked: "実機テスト" },
      { task: "マイルーティンとの差別化ポイントを明確にする", owner: "manual", priority: "medium" },
    ],
    revenueRoadmap: [],
    competitors: [
      { name: "マイルーティン", users: "累計300万DL", pricing: "無料+サブスク" },
      { name: "Streaks", users: "Apple Design Award", pricing: "$4.99買い切り" },
      { name: "Habitify", users: "レビュー15万件", pricing: "$29.99/年" },
    ],
    currentMonthly: 0,
    monthlyTarget: 5000,
    revenue: {
      bad: 0, normal: 5000, good: 30000,
      badNote: "Streaks(★4.8)やマイルーティン(300万DL)等の強豪と差別化できず",
      normalNote: "ワンタップの簡便さが刺さり月300DL、課金率3%",
      goodNote: "習慣トラッカー市場は年14%成長。日本市場特化で月1000DL",
    },
    revenueModel: "Free / Plus",
  },

  // ─── ローカルファイル変換 ───
  {
    id: "file-converter",
    name: "ローカルファイル変換",
    emoji: "🔄",
    status: "dev",
    statusLabel: "MVP完了・未デプロイ",
    phase: "Phase 2: デプロイ",
    kpis: [
      { label: "開発進捗", target: 100, actual: 70, unit: "%", period: "累計" },
    ],
    milestones: [
      { label: "MVP実装", deadline: "2026-03-10", status: "done" },
      { label: "Vercelデプロイ", deadline: "2026-03-22", status: "upcoming" },
    ],
    health: [],
    blockers: [
      { issue: "Vercel未デプロイ", impact: "ユーザーがアクセスできない", action: "Vercelデプロイ（5分）", owner: "manual", estimatedMinutes: 5 },
    ],
    todos: [
      { task: "Vercelデプロイ（5分）", owner: "manual", priority: "high" },
      { task: "動画変換(ffmpeg.wasm)追加", owner: "auto", priority: "medium" },
      { task: "PWA対応", owner: "auto", priority: "low" },
    ],
    revenueRoadmap: [],
    competitors: [
      { name: "iLoveIMG", users: "世界最大級", pricing: "無料/Premium$4/月" },
      { name: "heic2jpg.com", users: "不明", pricing: "無料（広告）" },
      { name: "CopyTrans HEIC", users: "不明", pricing: "無料" },
    ],
    currentMonthly: 0,
    monthlyTarget: 3000,
    revenue: {
      bad: 0, normal: 2000, good: 10000,
      badNote: "iLoveIMG等の大手に埋もれてPV伸びず",
      normalNote: "「サーバー送信なし」でニッチ層を獲得。月5000PV",
      goodNote: "ファイル変換ツールで月$4,000MRRの成功例あり",
    },
    revenueModel: "広告（将来）",
  },

  // ─── 車の維持費シミュレーター ───
  {
    id: "car-cost-sim",
    name: "車の維持費シミュレーター",
    emoji: "🧮",
    status: "planned",
    statusLabel: "計画中",
    phase: "Phase 0: 企画",
    kpis: [],
    milestones: [
      { label: "企画・設計", deadline: "2026-05-01", status: "upcoming" },
      { label: "web-media-engineとの連携設計", deadline: "2026-05-15", status: "upcoming" },
    ],
    health: [],
    blockers: [],
    todos: [
      { task: "web-media-engineとの連携設計", owner: "auto", priority: "medium" },
      { task: "実装（Next.js、クライアントサイド）", owner: "auto", priority: "medium" },
      { task: "自動車保険ASP案件契約", owner: "manual", priority: "high" },
    ],
    revenueRoadmap: [],
    competitors: [
      { name: "自動車ランニングコスト", users: "62,000車種DB", pricing: "無料（広告）" },
      { name: "高精度計算サイト(CASIO)", users: "大手", pricing: "無料" },
      { name: "ガリバー/楽天Car等の大手", users: "SEO上位独占", pricing: "無料記事" },
    ],
    currentMonthly: 0,
    monthlyTarget: 20000,
    revenue: {
      bad: 0, normal: 10000, good: 30000,
      badNote: "大手中古車サイトがSEO上位を独占。個人サイトが勝てない",
      normalNote: "ロングテールKWで月1万PV。保険見積り月3件",
      goodNote: "自動車保険+ローンアフィリで月3万円。web-media-engineと連携で相乗効果",
    },
    revenueModel: "アフィリエイト（保険/ローン）",
  },

  // ─── おうちストック ───
  {
    id: "home-stock",
    name: "おうちストック",
    emoji: "🏠",
    status: "dev",
    statusLabel: "開発中",
    phase: "Phase 1: MVP実装",
    kpis: [
      { label: "開発進捗", target: 100, actual: 20, unit: "%", period: "累計" },
    ],
    milestones: [
      { label: "テンプレート作成", deadline: "2026-03-10", status: "done" },
      { label: "MVP機能実装", deadline: "2026-05-01", status: "upcoming" },
    ],
    health: [],
    blockers: [],
    todos: [
      { task: "MVP機能実装（アイテム登録/通知/一覧）", owner: "auto", priority: "low" },
    ],
    revenueRoadmap: [],
    competitors: [
      { name: "zaico", users: "18万社", pricing: "無料(200件)/有料" },
      { name: "うちメモ", users: "不明", pricing: "無料" },
      { name: "monoca", users: "不明", pricing: "無料/プレミアム" },
    ],
    currentMonthly: 0,
    monthlyTarget: 3000,
    revenue: {
      bad: 0, normal: 2000, good: 8000,
      badNote: "zaico(18万社)やうちメモが既にある。無料アプリが多く課金率が低い",
      normalNote: "「交換時期通知」で差別化。月200DL、課金率2%",
      goodNote: "消耗品管理のニッチで月500DL",
    },
    revenueModel: "Free / Paid",
  },
];

// ============================================================
// 集計ヘルパー
// ============================================================

export function getRevenueSimulation() {
  const totals = { bad: 0, normal: 0, good: 0 };
  const items = PROJECTS.map((p) => {
    totals.bad += p.revenue.bad;
    totals.normal += p.revenue.normal;
    totals.good += p.revenue.good;
    return p;
  });
  return { items, totals };
}

export function getAllBlockers(): (Blocker & { project: string; emoji: string })[] {
  return PROJECTS.flatMap((p) =>
    p.blockers.map((b) => ({ ...b, project: p.name, emoji: p.emoji }))
  );
}

export function getAllMilestones(): (Milestone & { project: string; emoji: string })[] {
  return PROJECTS.flatMap((p) =>
    p.milestones.map((m) => ({ ...m, project: p.name, emoji: p.emoji }))
  ).sort((a, b) => a.deadline.localeCompare(b.deadline));
}

export function getAllHealth(): (SystemHealth & { project: string; emoji: string })[] {
  return PROJECTS.flatMap((p) =>
    p.health.map((h) => ({ ...h, project: p.name, emoji: p.emoji }))
  );
}
