"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// --- Hooks ---
import useRecentGall from "@/app/hooks/useRecentGall";

// --- Icons ---
import { CircleX } from "lucide-react";

// --- Types ---
import { GallMeta } from "@/app/lib/types/gall";

type Props = {
  gallData: GallMeta[];
};

function Item({
  abbr,
  name,
  deleteRecentGall,
}: {
  abbr: string;
  name: string;
  deleteRecentGall: (abbr: string, name: string) => void;
}) {
  return (
    <span className="flex items-center justify-between gap-1 bg-neutral-200 rounded-md text-xs text-neutral-800 p-1 whitespace-nowrap">
      <Link href={`/${abbr}`} className="cursor-pointer">
        {name}
      </Link>
      <CircleX
        size={15}
        className="cursor-pointer text-neutral-500"
        onClick={() => deleteRecentGall(abbr, name)}
      />
    </span>
  );
}

export default function RecentGall({ gallData }: Props) {
  const { abbr } = useParams();

  const { recentGalls, addRecentGall, deleteRecentGall } = useRecentGall();

  useEffect(() => {
    const gallName = gallData.find((item) => item.abbr === abbr)?.name;
    if (!gallName) return;

    addRecentGall(abbr as string, gallName);
  }, [abbr]);

  return (
    <div className="px-2 flex flex-nowrap overflow-x-auto gap-2">
      {recentGalls.map((item) => (
        <Item
          key={item.abbr}
          abbr={item.abbr}
          name={item.name}
          deleteRecentGall={deleteRecentGall}
        />
      ))}
    </div>
  );
}
