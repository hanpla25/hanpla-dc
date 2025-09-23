// --- Data ---
import { fetchGallName } from "@/app/lib/data/gall";
import { fetchPostData } from "@/app/lib/data/post";
import { fetchUserNickname, getUserToken } from "@/app/lib/data/user";

// --- UI ---
import HeadText from "@/app/ui/common/HeadText";
import WriteForm from "@/app/ui/write/WriteForm";

// --- Types ---
type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function WritePage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const abbr = params.abbr;

  const searchParams = await props.searchParams;
  const postId = Number(searchParams.postId) || undefined;

  const userToken = await getUserToken();
  const gallNamePromise = fetchGallName(abbr);

  const nicknamePromise = userToken
    ? fetchUserNickname(userToken.userId)
    : Promise.resolve(null);

  const [gallName, nickname] = await Promise.all([
    gallNamePromise,
    nicknamePromise,
  ]);

  const postData =
    postId != null ? await fetchPostData(abbr, postId) : undefined;

  return (
    <div>
      <HeadText text={gallName} href={`/${abbr}`} />
      <WriteForm
        postId={postId}
        postData={postData}
        gallName={gallName}
        nickname={nickname ?? undefined}
      />
    </div>
  );
}
