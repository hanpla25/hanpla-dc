"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// --- Utils ---
import pagination from "@/app/utils/generatePagination";
import PaginationForm from "./PaginationForm";

type Props = {
  abbr: string;
  totalPage: number;
};

function PageNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  const className = isActive
    ? "font-bold text-lg text-neutral-600 underline underline-offset-4 decoration-2"
    : "font-bold text-lg text-neutral-600";

  return (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

export default function Pagination({ abbr, totalPage }: Props) {
  const path = usePathname();
  const pathname = abbr === "best" ? "/best" : path;

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = pagination(currentPage, totalPage);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-x-4">
        {allPages.map((page) => (
          <PageNumber
            key={page}
            page={page}
            href={createPageURL(page)}
            isActive={currentPage === page}
          />
        ))}
      </div>
      <PaginationForm
        totalPage={totalPage}
        searchParams={searchParams}
        abbr={abbr}
      />
    </div>
  );
}
