// --- Data ---
import { fetchGallName } from "@/app/lib/data/gall";
import { fetchUserNickname, getUserToken } from "@/app/lib/data/user";

// --- UI ---
import HeadText from "@/app/ui/common/HeadText";
import WriteForm from "@/app/ui/write/WriteForm";

// --- Types ---
type Params = Promise<{ abbr: string }>;

export default async function WritePage(props: { params: Params }) {
  const params = await props.params;
  const abbr = params.abbr;

  const userToken = await getUserToken();
  const gallNamePromise = fetchGallName(abbr);

  const nicknamePromise = userToken
    ? fetchUserNickname(userToken.userId)
    : Promise.resolve(null);

  const [gallName, nickname] = await Promise.all([
    gallNamePromise,
    nicknamePromise,
  ]);

  return (
    <div>
      <HeadText text={gallName} href={`/${abbr}`} />
      <WriteForm gallName={gallName} nickname={nickname ?? undefined} />
    </div>
  );
}
