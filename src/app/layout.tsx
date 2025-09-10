import type { Metadata } from "next";

// --- Styles ---
import { Geist, Geist_Mono } from "next/font/google";
import "./style/globals.css";

// --- Data ---
import { fetchGallList } from "./lib/data/gall";

// --- UI ---
import Header from "./ui/header";
import RecentGall from "./ui/recent-gall";
import PopularGall from "./ui/layout/PopularGall";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한플라 디시",
  description: "인터넷 커뮤니티",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gallList = await fetchGallList();

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-6xl mx-auto`}
      >
        <Header gallList={gallList} isLogin={false} />
        <RecentGall gallData={gallList} />
        <main>{children}</main>
        <PopularGall />
      </body>
    </html>
  );
}
