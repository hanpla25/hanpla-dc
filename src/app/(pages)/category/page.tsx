// --- UI ---
import GallList from "@/app/ui/category/GallList";
import HeadText from "@/app/ui/common/HeadText";

export default function CategoryPage() {
  return (
    <div className="min-h-[500px]">
      <HeadText text="전체 갤러리" />
      <div className="mx-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <GallList className="block border border-neutral-200 rounded px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-100" />
      </div>
    </div>
  );
}
