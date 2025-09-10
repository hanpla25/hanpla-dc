// --- UI ---
import PostUi from "@/app/ui/post";

// --- Tyeps ---
type Params = Promise<{ abbr: string; postId: number }>;

export default async function PostPage(props: { params: Params }) {
  const params = await props.params;
  const abbr = params.abbr;
  const postId = params.postId;

  return (
    <>
      <PostUi abbr={abbr} postId={postId} />
    </>
  );
}
