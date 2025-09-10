// --- Data ---
import { fetchGallName } from "@/app/lib/data/gall";
import { fetchPostData } from "@/app/lib/data/post";

// --- Utils ---
import formatDate from "@/app/utils/formatDate";

// --- UI ---
import HeadText from "../common/HeadText";

// --- Types ---

type Props = {
  abbr: string;
  postId: number;
};

function Title({ title, createdAt }: { title: string; createdAt: string }) {
  return (
    <div className="flex items-center justify-between px-2 lg:px-1 py-1 border-y border-neutral-400">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-sm text-neutral-600">
        {formatDate(createdAt, "YMDT")}
      </span>
    </div>
  );
}

function Info({
  nickname,
  viewCount,
  likeCount,
  commentCount,
  ipAddress,
  isLogin,
}: {
  nickname: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  ipAddress: string;
  isLogin: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-2 lg:px-1 py-1.5 border-b border-neutral-200 mb-4">
      <span className="font-medium">
        {nickname} {!isLogin && ipAddress}
      </span>
      <div className="space-x-2 text-sm text-neutral-600">
        <span>조회 {viewCount}</span>
        <span>추천 {likeCount}</span>
        <span>댓글 {commentCount}</span>
      </div>
    </div>
  );
}

export default async function PostUi({ abbr, postId }: Props) {
  const [gallName, postData] = await Promise.all([
    abbr === "best" ? "실시간 베스트" : fetchGallName(abbr),
    fetchPostData(abbr, postId),
  ]);

  return (
    <div>
      <HeadText text={`${gallName}`} href={`/${abbr}`} />
      <Title title={postData.title} createdAt={postData.createdAt} />
      <Info
        nickname={postData.nickname}
        viewCount={postData.viewCount}
        likeCount={postData.likeCount}
        commentCount={postData.commentCount}
        ipAddress={postData.ipAddress}
        isLogin={postData.isLogin}
      />
    </div>
  );
}
