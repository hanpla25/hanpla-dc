"use client";

import { useState } from "react";

// --- Actions ---
import { commentAction } from "@/app/lib/actions/post";

// --- UI ---
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

// --- Types ---
import { CommentType } from "@/app/lib/types/post";
import { fetchCommentData } from "@/app/lib/data/post";

type Props = {
  nickname?: string;
  commentData: CommentType[];
  commentCount: number;
  postId: number;
};

function CommentHead({ commentCount }: { commentCount: number }) {
  return (
    <div className="mx-2 p-2 border border-neutral-300 rounded-md bg-neutral-50">
      <span className="text-xs">댓글 {commentCount} 개</span>
    </div>
  );
}

export default function CommentUi({
  nickname,
  commentData,
  commentCount,
  postId,
}: Props) {
  const [comments, setComments] = useState<CommentType[]>(commentData);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      await commentAction(formData);
      const newComments = await fetchCommentData(postId);
      setComments(newComments);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert("댓글 작성에 실패했습니다.");
    }
  }

  return (
    <div className="mt-4">
      <CommentHead commentCount={commentCount} />
      <CommentList
        postId={postId}
        comments={comments}
        onSubmit={handleSubmit}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />
      <CommentForm
        nickname={nickname}
        postId={postId}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
