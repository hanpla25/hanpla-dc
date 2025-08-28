import { useState } from "react";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";

type Props = {
  totalPage: number;
  searchParams: ReadonlyURLSearchParams;
  abbr: string | string[];
};

export default function PaginationForm({
  totalPage,
  searchParams,
  abbr,
}: Props) {
  const router = useRouter();
  const [inputPage, setInputPage] = useState("");

  const goToPage = () => {
    const pageNum = Number(inputPage);

    if (!pageNum || pageNum < 1 || pageNum > totalPage) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", pageNum.toString());
    router.push(`/${abbr}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1 ml-4 mt-4">
      <input
        type="number"
        min={1}
        max={totalPage}
        value={inputPage}
        onChange={(e) => setInputPage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") goToPage();
        }}
        className="w-16 h-9 border border-neutral-300 rounded px-2 text-sm"
        placeholder="이동"
      />
      <span className="mx-2">/{totalPage}</span>
      <button
        onClick={goToPage}
        className="h-9 px-3 rounded bg-neutral-800 text-white text-sm"
      >
        이동
      </button>
    </div>
  );
}
