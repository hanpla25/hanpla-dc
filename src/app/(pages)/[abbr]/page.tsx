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
  const { search, option } = searchParams;
  const queryString = new URLSearchParams(searchParams).toString();

  return (
    <div>
      <GallUi
        abbr={abbr}
        isPopular={false}
        isBest={abbr === "best" ? true : false}
        currentPage={currentPage}
        search={search}
        option={option}
        queryString={queryString}
      />
    </div>
  );
}
