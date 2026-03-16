import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bloom Software",
  description: "日常をちょっと豊かにする、スマホアプリを作っています。",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Bloom Software",
    description: "日常をちょっと豊かにする、スマホアプリを作っています。",
    siteName: "Bloom Software",
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
