"use client";

import { useState } from "react";

// --- Actions ---
import { commentAction } from "@/app/lib/actions/post";

// --- UI ---
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

// --- Types ---
import { CommentType } from "@/app/lib/types/post";

type Props = {
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
  commentData,
  commentCount,
  postId,
}: Props) {
  const [comments, setComments] = useState<CommentType[]>(commentData);

  async function handleSubmit(formData: FormData) {
    try {
      const newComment: CommentType = await commentAction(formData);
      setComments((prev) => [...prev, newComment]);
    } catch (err) {
      console.error(err);
      alert("댓글 작성에 실패했습니다.");
    }
  }

  return (
    <div className="mt-4">
      <CommentHead commentCount={commentCount} />
      <CommentList comments={comments} />
      <CommentForm postId={postId} onSubmit={handleSubmit} />
    </div>
  );
}
