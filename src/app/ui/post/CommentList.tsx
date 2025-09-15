// --- Utils ---
import formatDate from "@/app/utils/formatDate";

// --- Tyeps ---
import { CommentType } from "@/app/lib/types/post";

type Props = {
  comments: CommentType[];
};

function CommentContent({
  comment,
  isReply = false,
}: {
  comment: CommentType;
  isReply?: boolean;
}) {
  return (
    <div
      className={`px-2 py-3 border-b border-neutral-300 space-y-1.5 ${
        isReply ? "bg-neutral-50" : ""
      }`}
    >
      <p className={`text-sm ${isReply ? "ml-2" : ""}`}>
        {isReply && (
          <span className="mr-2 font-semibold text-neutral-400">ㄴ</span>
        )}
        <span className="mr-2 font-semibold">{comment.nickname}</span>
        <span className="text-neutral-400">
          {formatDate(comment.createdAt, "MDT")}
        </span>
      </p>
      <p className={`text-sm ${isReply ? "ml-2" : ""}`}>{comment.content}</p>
    </div>
  );
}

function CommentItem({
  comment,
  replies,
}: {
  comment: CommentType;
  replies: CommentType[];
}) {
  return (
    <li>
      {/* 댓글 본문 */}
      <CommentContent comment={comment} />

      {/* 대댓글 */}
      {replies.length > 0 && (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <CommentContent comment={reply} isReply />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CommentList({ comments }: Props) {
  // 부모 댓글 (parentId === null)
  const rootComments = comments.filter((c) => c.parentId === null);

  // 자식 댓글(대댓글) 필터링 함수
  const getReplies = (commentId: number) =>
    comments.filter((c) => c.parentId === commentId);

  return (
    <ul>
      {rootComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          replies={getReplies(comment.id)}
        />
      ))}
    </ul>
  );
}
