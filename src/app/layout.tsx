import type { Metadata } from "next";

// --- Data ---
import { fetchGallListData } from "./lib/data/gall-data";

// --- UI ---
import Header from "./ui/header/Header";
import ItemWrapper from "./ui/side/ItemWrapper";
import GallList from "./ui/side/GallList";
import ProfileBox from "./ui/side/ProfileBox";

// --- styles ---
import { Geist, Geist_Mono } from "next/font/google";
import "./style/globals.css";
import { getUserToken } from "./lib/data/user-data";

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
  const [userToken, allGallList, popularGallList, newestGallList] =
    await Promise.all([
      getUserToken(),
      fetchGallListData(),
      fetchGallListData("popular", 5),
      fetchGallListData("newest", 5),
    ]);

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  max-w-6xl mx-auto`}
      >
        <Header userToken={userToken} allGallList={allGallList} />
        <div className="lg:flex gap-8">
          {/* 왼쪽 */}
          <main className="lg:basis-3/4">{children}</main>

          {/* 오른쪽 */}
          <aside className="hidden lg:flex flex-col basis-1/4 gap-16">
            <ItemWrapper>
              <ProfileBox userData={null} />
            </ItemWrapper>
            <ItemWrapper>
              <GallList listName="인기 갤러리" gallData={popularGallList} />
            </ItemWrapper>
            <ItemWrapper>
              <GallList listName="최신 갤러리" gallData={newestGallList} />
            </ItemWrapper>
          </aside>
        </div>
      </body>
    </html>
  );
}
