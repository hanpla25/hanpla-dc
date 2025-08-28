import Link from "next/link";

// --- Data ---
import { fetchGallListData } from "@/app/lib/data/gall-data";

export default async function PopularGallList() {
  const popularGallData = await fetchGallListData("popular", 10);

  return (
    <ul className="px-2 py-1 flex flex-wrap gap-2 bg-neutral-100 lg:hidden">
      {popularGallData.map((item) => (
        <li
          key={item.abbr}
          className="px-2 bg-neutral-200 rounded-md flex items-center"
        >
          <Link href={`${item.abbr}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}
