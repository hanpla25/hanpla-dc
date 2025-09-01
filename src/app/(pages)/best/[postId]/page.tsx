// --- UI ---
import PostUi from "@/app/ui/post/PostUi";
import GallUi from "@/app/ui/gall/GallUi";

// --- Data ---
import { fetchPostListTotalPage } from "@/app/lib/data/gall-data";
import { fetchPostData } from "@/app/lib/data/post-data";

type Params = Promise<{ abbr: string; postId: number }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function BestPostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const abbr = params.abbr;
  const postId = params.postId;
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const { search, option } = searchParams;
  const queryString = new URLSearchParams(searchParams).toString();

  const [postData, totalPage] = await Promise.all([
    fetchPostData("best", postId),
    fetchPostListTotalPage({
      page: currentPage,
      search,
      option,
      isPopular: true,
    }),
  ]);

  return (
    <>
      <PostUi abbr={abbr} postData={postData} />
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
