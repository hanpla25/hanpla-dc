"use client";

import { Dispatch, SetStateAction, useState } from "react";

// --- Utils ---
import formatDate from "@/app/utils/formatDate";

// --- UI ---
import CommentForm from "./CommentForm";

// --- Tyeps ---
import { CommentType } from "@/app/lib/types/post";

type Props = {
  postId: number;
  comments: CommentType[];
  onSubmit: (formData: FormData) => Promise<void>;
  isSuccess: boolean;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

function CommentContent({
  comment,
  isReply,
  replyingTo,
  setReplyingTo,
  setIsSuccess,
}: {
  comment: CommentType;
  isReply?: boolean;
  replyingTo: number | null;
  setReplyingTo: Dispatch<SetStateAction<number | null>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}) {
  const handleCommentClick = () => {
    setIsSuccess(false);
    if (comment.id !== replyingTo) setReplyingTo(comment.id);
    if (replyingTo === comment.id) setReplyingTo(null);
  };

  console.log(formatDate(comment.createdAt, "MDT"));
  console.log(formatDate(comment.createdAt, "YMD"));
  console.log(formatDate(comment.createdAt, "YMDT"));
  console.log(formatDate(comment.createdAt, "time"));

  return (
    <div
      onClick={() => handleCommentClick()}
      className={`px-2 py-3 border-b border-neutral-300 space-y-1.5 ${
        isReply ? "bg-neutral-50" : ""
      }`}
    >
      <p className={`text-sm ${isReply ? "ml-2" : ""}`}>
        {isReply && (
          <span className="mr-2 font-semibold text-neutral-400">ㄴ</span>
        )}
        <span className="mr-1 font-semibold">{comment.nickname}</span>
        <span className="text-neutral-400">
          {!comment.isLogin && comment.ipAddress}
        </span>
        <span className="ml-2 text-neutral-400">
          {formatDate(comment.createdAt, "MDT")}
        </span>
      </p>
      <pre className={`text-sm font-geist-sans ${isReply ? "ml-2" : ""}`}>
        {comment.content}
      </pre>
    </div>
  );
}

function CommentItem({
  postId,
  comment,
  replies,
  replyingTo,
  setReplyingTo,
  onSubmit,
  isSuccess,
  setIsSuccess,
}: {
  postId: number;
  comment: CommentType;
  replies: CommentType[];
  replyingTo: number | null;
  setReplyingTo: Dispatch<SetStateAction<number | null>>;
  onSubmit: (formData: FormData) => Promise<void>;
  isSuccess: boolean;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <li>
      {/* 댓글 본문 */}
      <CommentContent
        comment={comment}
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
        setIsSuccess={setIsSuccess}
      />
      {replyingTo === comment.id && (
        <div className="ml-2">
          {!isSuccess && (
            <>
              <span>ㄴ</span>
              <CommentForm
                postId={postId}
                onSubmit={onSubmit}
                parentId={replyingTo}
              />
            </>
          )}
        </div>
      )}

      {/* 대댓글 */}
      {replies.length > 0 && (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <CommentContent
                comment={reply}
                isReply={true}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                setIsSuccess={setIsSuccess}
              />
              {replyingTo === reply.id && (
                <div className="ml-2 pb-2 border-b border-neutral-300">
                  {!isSuccess && (
                    <>
                      <span>ㄴ</span>
                      <CommentForm
                        postId={postId}
                        onSubmit={onSubmit}
                        parentId={replyingTo}
                      />
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CommentList({
  postId,
  comments,
  onSubmit,
  isSuccess,
  setIsSuccess,
}: Props) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  // 부모 댓글 (parentId === null)
  const rootComments = comments.filter((c) => c.parentId === null);

  // 자식 댓글(대댓글) 필터링 함수
  const getReplies = (commentId: number) =>
    comments.filter((c) => c.parentId === commentId);

  return (
    <ul className="mx-2">
      {rootComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          replies={getReplies(comment.id)}
          postId={postId}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
          onSubmit={onSubmit}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
        />
      ))}
    </ul>
  );
}
