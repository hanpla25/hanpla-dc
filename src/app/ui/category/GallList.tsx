import Link from "next/link";

// --- Data ---
import { fetchGallList } from "@/app/lib/data/gall";

type Props = {
  order?: "popular" | "newest" | undefined;
  size?: number;
  className?: string;
};

export default async function GallList({ order, size, className }: Props) {
  const gallList = await fetchGallList(order, size);

  return (
    <>
      {gallList.map((item) => (
        <Link key={item.abbr} href={`/${item.abbr}`} className={className}>
          {item.name}
        </Link>
      ))}
    </>
  );
}
