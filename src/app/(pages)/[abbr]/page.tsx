// --- UI ---
import GallUi from "@/app/ui/gall";

// --- Types ---
type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function AbbrPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const abbr = params.abbr;

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const { search, option, mode } = searchParams;
  const queryString = new URLSearchParams(searchParams).toString();

  const isPopular = mode === "popular" || abbr === "best" ? true : false;

  return (
    <div>
      <GallUi
        abbr={abbr}
        isPopular={isPopular}
        isBest={abbr === "best" ? true : false}
        currentPage={currentPage}
        search={search}
        option={option}
        queryString={queryString}
      />
    </div>
  );
}
