import { Suspense } from "react";

// --- Data ---
import { fetchPostListTotalPage } from "@/app/lib/data/gall-data";

// --- UI ---
import PopularGallList from "@/app/ui/home/PopularGallList";
import HeadText from "@/app/ui/common/HeadText";
import GallUi from "@/app/ui/gall/GallUi";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const [searchParams, totalPage] = await Promise.all([
    props.searchParams,
    fetchPostListTotalPage({ page: 1, isPopular: true }),
  ]);

  const currentPage = Number(searchParams.page) || 1;
  const queryString = new URLSearchParams(searchParams).toString();

  return (
    <>
      <HeadText text="실시간 베스트" isLink={true} href={"/best"} />
      <GallUi
        abbr="best"
        currentPage={currentPage}
        queryString={queryString}
        totalPage={totalPage}
      />
      <Suspense fallback={null}>
        <PopularGallList />
      </Suspense>
    </>
  );
}
