import { redirect } from "next/navigation";

// --- Data ---
import { fetchUserNickname, getUserToken } from "@/app/lib/data/user";

// --- UI ---
import HeadText from "@/app/ui/common/HeadText";
import Nav from "@/app/ui/profile/Nav";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userToken = await getUserToken();

  if (!userToken) redirect("/");

  const nickname = await fetchUserNickname(userToken.userId);

  return (
    <>
      <HeadText text={`${nickname}의 프로필`} />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-180px)]">
        <aside className="p-4 md:w-64">
          <Nav />
        </aside>
        <main className="flex-1 p-4 bg-white">{children}</main>
      </div>
    </>
  );
}
