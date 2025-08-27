import Link from "next/link";

// --- Type ---
import { GallMeta } from "@/app/lib/type/gallType";

type Props = { listName: string; gallData: GallMeta[] };

export default function GallList({ listName, gallData }: Props) {
  return (
    <>
      <h2>{listName}</h2>

      <ul className="space-y-1">
        {gallData.map((item, i) => (
          <li key={item.abbr}>
            <Link href={`/${item.abbr}`}>
              {i + 1}. {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
