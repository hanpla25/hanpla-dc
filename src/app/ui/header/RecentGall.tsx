import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// --- Hooks ---
import useRecentGall from "@/app/hooks/useRecentGall";

// --- Types ---
import { GallMeta } from "@/app/lib/type/gallType";

type Props = {
  gallData: GallMeta[];
};

export default function RecentGall({ gallData }: Props) {
  const { abbr } = useParams();

  const { recentGalls, addRecentGall, deleteRecentGall } = useRecentGall();

  useEffect(() => {
    const gallName = gallData.find((item) => item.abbr === abbr)?.name;
    if (!gallName) return;

    addRecentGall(abbr as string, gallName);
  }, [abbr]);

  return (
    <>
      {recentGalls.length > 0 && (
        <ul className="px-2 flex flex-wrap gap-2">
          {recentGalls.map((item) => (
            <li
              key={item.abbr}
              className="bg-neutral-100 rounded-md flex items-center"
            >
              <Link
                href={`/${item.abbr}`}
                className="block pl-3 pr-1 py-1 text-sm text-neutral-800"
              >
                {item.name}
              </Link>

              <button
                onClick={() => deleteRecentGall(item.abbr)}
                className="pr-2 text-xs text-neutral-400 cursor-pointer"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
