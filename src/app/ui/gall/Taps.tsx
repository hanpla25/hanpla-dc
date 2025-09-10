import Link from "next/link";

// --- Types ---
type Props = {
  abbr: string;
  isPopular: boolean;
};

function Tap({
  name,
  href,
  isActive,
}: {
  name: string;
  href: string;
  isActive: boolean;
}) {
  const activeCss =
    "text-neutral-700 hover:text-neutral-900 border-b-2 border-neutral-700";

  const inActiveCss = "text-neutral-500 hover:text-neutral-800";

  return (
    <Link href={href} className={isActive ? activeCss : inActiveCss}>
      {name}
    </Link>
  );
}

function WriteLink({ abbr }: { abbr: string }) {
  return (
    <Link
      href={`/${abbr}/write`}
      className="px-4 py-1.5 rounded-xl bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition-colors shadow-sm"
    >
      글쓰기
    </Link>
  );
}

export default function Taps({ abbr, isPopular }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 px-2 pb-2">
      <div className="flex gap-4 text-sm font-medium">
        <Tap name="전체글" href={`/${abbr}`} isActive={!isPopular} />
        <Tap
          name="개념글"
          href={`/${abbr}?mode=popular`}
          isActive={isPopular}
        />
      </div>
      <WriteLink abbr={abbr} />
    </div>
  );
}
