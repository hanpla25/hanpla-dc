// --- Data ---
import { fetchGallName } from "@/app/lib/data/gall";
import { fetchCommentData, fetchPostData } from "@/app/lib/data/post";

// --- Utils ---
import formatDate from "@/app/utils/formatDate";

// --- UI ---
import HeadText from "../common/HeadText";
import Content from "./Content";
import CommentUi from "./CommentUi";
import PostButtons from "./PostButtons";
import PostEditButtons from "./PostEditButtons";

// --- Types ---
type Props = {
  nickname?: string;
  abbr: string;
  postId: number;
};

function Title({ title, createdAt }: { title: string; createdAt: string }) {
  return (
    <div className="flex items-center justify-between px-2 py-1 border-y border-neutral-400">
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
    <div className="flex items-center justify-between px-2 py-1.5 border-b border-neutral-200 mb-4">
      <span className="flex items-center gap-1 font-medium">
        {nickname}
        <span className="text-xs text-neutral-400">
          {!isLogin && ipAddress}
        </span>
      </span>
      <div className="space-x-2 text-sm text-neutral-600">
        <span>조회 {viewCount}</span>
        <span>추천 {likeCount}</span>
        <span>댓글 {commentCount}</span>
      </div>
    </div>
  );
}

export default async function PostUi({ nickname, abbr, postId }: Props) {
  const [gallName, postData, commentData] = await Promise.all([
    abbr === "best" ? "실시간 베스트" : fetchGallName(abbr),
    fetchPostData(abbr, postId),
    fetchCommentData(postId),
  ]);

  const canEdit = !postData.isLogin || postData.nickname === nickname;

  return (
    <div className="mb-4">
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
      <Content content={postData.content} />
      <PostButtons
        like_count={postData.likeCount}
        dislike_count={postData.dislikeCount}
        post_id={postData.id}
      />
      {canEdit && (
        <PostEditButtons postDataIsLogin={postData.isLogin} postId={postId} />
      )}

      <CommentUi
        nickname={nickname}
        commentData={commentData}
        commentCount={postData.commentCount}
        postId={postData.id}
      />
    </div>
  );
}
