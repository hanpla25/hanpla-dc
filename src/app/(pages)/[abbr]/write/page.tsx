// --- Data ---
import { fetchGallName } from "@/app/lib/data/gall";

// --- UI ---
import HeadText from "@/app/ui/common/HeadText";
import WriteForm from "@/app/ui/write/WriteForm";

// --- Types ---
type Params = Promise<{ abbr: string }>;

export default async function WritePage(props: { params: Params }) {
  const params = await props.params;
  const abbr = params.abbr;

  const [gallName] = await Promise.all([fetchGallName(abbr)]);

  return (
    <div>
      <HeadText text={gallName} href={`/${abbr}`} />
      <WriteForm gallName={gallName} />
    </div>
  );
}
