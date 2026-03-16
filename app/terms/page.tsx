import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | Mankai Software",
};

const UPDATED_AT = "2026年3月16日";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <span className="text-xl">🌸</span>
            <span className="text-base font-bold tracking-tight">Mankai Software</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">利用規約</h1>
          <p className="text-sm text-gray-400 mb-10">最終更新日：{UPDATED_AT}</p>

          <div className="prose prose-gray max-w-none space-y-8 text-sm leading-7 text-gray-700">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">1. はじめに</h2>
              <p>
                本利用規約（以下「本規約」）は、Mankai Software（以下「当方」）が提供するスマートフォンアプリケーション
                （以下「本アプリ」）の利用条件を定めるものです。
                本アプリをご利用いただくことで、本規約に同意したものとみなします。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">2. サービスの内容</h2>
              <p>
                本アプリは、駐車場の料金看板を撮影し、AI技術を用いて料金ルールを解析・表示する機能を提供します。
                また、駐車予定時間に応じた概算料金の計算・表示機能を含みます。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">3. 免責事項</h2>
              <h3 className="font-semibold text-gray-800 mb-2">3-1. 解析精度について</h3>
              <p>
                本アプリの料金解析はAIによる自動処理であり、看板の状態・撮影条件・料金表記の複雑さ等により、
                解析結果が実際の料金と異なる場合があります。
                実際の駐車料金は必ず駐車場の表示をご確認ください。
              </p>
              <h3 className="font-semibold text-gray-800 mt-5 mb-2">3-2. 損害について</h3>
              <p>
                本アプリの利用または利用不能により生じた損害（解析誤りによる金銭的損害を含む）について、
                当方は一切の責任を負いません。本アプリはあくまで参考情報の提供を目的としています。
              </p>
              <h3 className="font-semibold text-gray-800 mt-5 mb-2">3-3. サービスの継続性について</h3>
              <p>
                当方は、予告なくサービスの内容を変更・停止・終了することがあります。
                これによりユーザーに生じた損害について、当方は責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">4. 禁止事項</h2>
              <p>ユーザーは、以下の行為を行ってはなりません。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>本アプリを違法な目的に使用すること</li>
                <li>本アプリのリバースエンジニアリング・改ざんを行うこと</li>
                <li>本アプリのサーバーやネットワークに過度な負荷をかける行為</li>
                <li>他のユーザーや第三者の権利を侵害する行為</li>
                <li>その他、当方が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">5. 知的財産権</h2>
              <p>
                本アプリに関するすべての知的財産権は当方に帰属します。
                本規約で明示的に許可された範囲を超えて、本アプリを複製・配布・改変することを禁止します。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">6. 規約の変更</h2>
              <p>
                当方は、必要に応じて本規約を変更することがあります。
                変更後の規約は本ページにて公開し、公開時点から効力を生じるものとします。
                重要な変更がある場合はアプリ内でも通知します。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">7. 準拠法・管轄</h2>
              <p>
                本規約は日本法に準拠して解釈されます。
                本アプリの利用に関して生じた紛争については、当方の所在地を管轄する裁判所を第一審の専属管轄裁判所とします。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">8. お問い合わせ</h2>
              <p>本規約に関するご質問・ご意見は、以下のメールアドレスにてお受けします。</p>
              <p className="mt-2">
                <a href="mailto:bloomsoftware.info@gmail.com" className="text-blue-600 underline">
                  bloomsoftware.info@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Mankai Software</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">プライバシーポリシー</Link>
            <Link href="/terms" className="text-gray-600">利用規約</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
