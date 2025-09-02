// --- Data ---
import { fetchPostListTotalPage } from "@/app/lib/data/gall-data";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function BestPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const { search, option } = searchParams;
  const queryString = new URLSearchParams(searchParams).toString();

  const [totalPage] = await Promise.all([
    fetchPostListTotalPage({
      page: currentPage,
      search,
      option,
      isPopular: true,
    }),
  ]);

  return (
    <>
      <GallUi
        abbr="best"
        currentPage={currentPage}
        queryString={queryString}
        totalPage={totalPage}
        search={search}
        option={option}
      />
    </>
  );
}
