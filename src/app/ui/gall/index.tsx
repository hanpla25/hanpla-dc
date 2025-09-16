// --- Data ---
import {
  fetchGallName,
  fetchPostListData,
  fetchPostListTotalPage,
} from "@/app/lib/data/gall";

// --- UI ---
import HeadText from "../common/HeadText";
import PostList from "./PostList";
import Pagination from "../common/Pagination";
import SearchForm from "./SearchForm";
import Taps from "./Taps";

type Props = {
  abbr: string;
  isPopular: boolean;
  isBest: boolean;
  currentPage?: number;
  search?: string;
  option?: string;
  queryString?: string;
};

export default async function GallUi({
  abbr,
  currentPage,
  isPopular,
  isBest,
  search,
  option,
  queryString,
}: Props) {
  const page = currentPage || 1;

  const [gallName, postList, totalPage] = await Promise.all([
    abbr === "best" ? "실시간 베스트" : fetchGallName(abbr),
    fetchPostListData({ abbr, page, isPopular, search, option }),
    fetchPostListTotalPage({ abbr, isPopular, search, option }),
  ]);

  return (
    <div>
      <HeadText text={gallName} href={`/${abbr}`} />
      {abbr !== "best" && <Taps abbr={abbr} isPopular={isPopular} />}
      <PostList
        abbr={abbr}
        isBest={isBest}
        postList={postList.postList}
        queryString={queryString}
      />
      <SearchForm abbr={abbr} />
      <Pagination abbr={abbr} totalPage={totalPage} />
    </div>
  );
}
