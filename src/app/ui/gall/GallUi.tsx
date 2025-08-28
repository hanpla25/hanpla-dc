// --- UI ---
import { Suspense } from "react";
import GallPostList from "./GallPostList";
import LoadingSpinner from "../common/LoadingSpinner";
import GallSearchForm from "./GallSearchForm";
import Pagination from "../common/Pagination";
import PaginationForm from "../common/PaginationForm";

type Props = {
  abbr: string;
  currentPage: number;
  queryString: string;
  totalPage: number;
};

export default function GallUi({
  abbr,
  currentPage,
  queryString,
  totalPage,
}: Props) {
  return (
    <div className="px-2 space-y-4 mb-4">
      <Suspense key={currentPage + queryString} fallback={<LoadingSpinner />}>
        <GallPostList
          abbr={abbr}
          currentPage={currentPage}
          queryString={queryString}
        />
      </Suspense>
      <GallSearchForm abbr={abbr} />
      <Pagination abbr={abbr} totalPage={totalPage} />
    </div>
  );
}
