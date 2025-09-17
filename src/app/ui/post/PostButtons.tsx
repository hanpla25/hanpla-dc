"use client";

import { useState } from "react";

// --- Actions ---
import { increaseCollumFromPosts } from "@/app/lib/actions/post";

function Button({
  label,
  postId,
  initialCount,
  collum,
}: {
  label: string;
  postId: number;
  initialCount: number;
  collum: "likeCount" | "dislikeCount";
}) {
  const [count, setCount] = useState(initialCount);
  const [disable, setDisable] = useState(false);

  const handleButtonClick = async () => {
    setCount((prev) => prev + 1);
    setDisable(true);

    try {
      await increaseCollumFromPosts({ postId, collum });
    } catch (err) {
      console.error(err);
      setCount((prev) => prev - 1);
      setDisable(false);
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className="text-sm border bg-neutral-600 text-white rounded-full p-2 space-x-2 cursor-pointer hover:bg-neutral-700"
      disabled={disable}
    >
      <span>{label}</span>
      <span>{count}</span>
    </button>
  );
}

export default function PostButtons({
  post_id,
  like_count,
  dislike_count,
}: {
  post_id: number;
  like_count: number;
  dislike_count: number;
}) {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <Button
        label={"개추"}
        postId={post_id}
        initialCount={like_count}
        collum={"likeCount"}
      />
      <Button
        label={"비추"}
        postId={post_id}
        initialCount={dislike_count}
        collum={"dislikeCount"}
      />
    </div>
  );
}
