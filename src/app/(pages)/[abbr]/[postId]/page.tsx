// --- UI ---
import GallUi from "@/app/ui/gall";
import PostUi from "@/app/ui/post";

// --- Tyeps ---
type Params = Promise<{ abbr: string; postId: number }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function PostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const abbr = params.abbr;
  const postId = params.postId;

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const { search, option, mode } = searchParams;
  const queryString = new URLSearchParams(searchParams).toString();

  const isPopular = mode === "popular" || abbr === "best" ? true : false;

  return (
    <>
      <PostUi abbr={abbr} postId={postId} />
      <GallUi
        abbr={abbr}
        isPopular={isPopular}
        isBest={abbr === "best" ? true : false}
        currentPage={currentPage}
        search={search}
        option={option}
        queryString={queryString}
      />
    </>
  );
}
