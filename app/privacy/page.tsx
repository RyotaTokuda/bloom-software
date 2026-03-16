import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Mankai Software",
};

const UPDATED_AT = "2026年3月16日";

export default function PrivacyPage() {
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
          <h1 className="text-2xl font-bold mb-2">プライバシーポリシー</h1>
          <p className="text-sm text-gray-400 mb-10">最終更新日：{UPDATED_AT}</p>

          <div className="prose prose-gray max-w-none space-y-8 text-sm leading-7 text-gray-700">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">1. はじめに</h2>
              <p>
                Mankai Software（以下「当方」）は、提供するスマートフォンアプリケーション（以下「本アプリ」）において、
                ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
                本プライバシーポリシーは、本アプリが収集する情報とその取り扱いについて説明します。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">2. 収集する情報</h2>
              <h3 className="font-semibold text-gray-800 mb-2">2-1. 端末内に保存される情報</h3>
              <p>本アプリは、以下のデータをお使いの端末内にのみ保存します。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>解析した駐車場の料金情報（ルールデータ）</li>
                <li>解析に使用した画像のパス</li>
                <li>解析履歴（最大件数は設定により異なります）</li>
                <li>アプリ内の設定情報</li>
              </ul>
              <p className="mt-3">これらのデータは端末内の AsyncStorage に保存され、外部サーバーへは送信されません。</p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">2-2. 解析のためにサーバーへ送信される情報</h3>
              <p>
                「看板を読み取る」機能を使用する際、撮影または選択した画像データを
                当方が運営する解析サーバーへ送信します。
                この画像データは解析処理にのみ使用され、サーバー上に保存・蓄積されることはありません。
              </p>

              <h3 className="font-semibold text-gray-800 mt-5 mb-2">2-3. 収集しない情報</h3>
              <p>当方は以下の情報を収集しません。</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>氏名・住所・電話番号などの個人を特定できる情報</li>
                <li>位置情報（GPS）</li>
                <li>端末の識別情報</li>
                <li>クレジットカード情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">3. カメラおよびフォトライブラリへのアクセス</h2>
              <p>
                本アプリは、駐車場の料金看板を撮影・選択する機能のために、
                カメラおよびフォトライブラリへのアクセス許可を求めます。
                取得した画像は解析目的のみに使用され、無断で外部へ公開・共有することはありません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">4. 第三者サービスの利用</h2>
              <p>本アプリは、画像解析のために Google の生成 AI サービス（Gemini API）を利用しています。
              送信した画像データの取り扱いについては、Google のプライバシーポリシーに従います。</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">5. 情報の管理</h2>
              <p>
                端末内に保存されたデータはアプリのアンインストールにより削除されます。
                ユーザーはアプリ内の設定から解析履歴を削除することができます。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">6. 未成年者の利用</h2>
              <p>
                本アプリは13歳未満のお子様を対象としていません。
                13歳未満のお子様の個人情報を故意に収集することはありません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">7. プライバシーポリシーの変更</h2>
              <p>
                当方は、必要に応じて本ポリシーを変更することがあります。
                変更があった場合は、本ページにて更新日とともに公開します。
                重要な変更がある場合はアプリ内でも通知します。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">8. お問い合わせ</h2>
              <p>
                本プライバシーポリシーに関するご質問・ご意見は、以下のメールアドレスにてお受けします。
              </p>
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
            <Link href="/privacy" className="text-gray-600">プライバシーポリシー</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">利用規約</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
