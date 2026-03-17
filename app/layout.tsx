import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mankai Software",
  description: "ちょっとした不便を解消する、シンプルで使いやすいアプリを作っています。",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Mankai Software",
    description: "ちょっとした不便を解消する、シンプルで使いやすいアプリを作っています。",
    siteName: "Mankai Software",
    url: "https://mankai-software.vercel.app",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mankai Software",
    description: "ちょっとした不便を解消する、シンプルで使いやすいアプリを作っています。",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geist.className} bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
