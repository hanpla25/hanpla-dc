// --- UI ---
import GallUi from "@/app/ui/gall";

export default async function Home() {
  return (
    <>
      <GallUi abbr="best" isPopular={true} isBest={true} />
    </>
  );
}
