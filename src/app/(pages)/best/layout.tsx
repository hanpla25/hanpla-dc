// --- UI ---
import HeadText from "@/app/ui/common/HeadText";

export default function BestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeadText text="실시간 베스트" isLink={true} href={"/best"} />
      {children}
    </>
  );
}
