// --- Types ---
import { CommentType } from "@/app/lib/types/post";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type Props = {
  commentData: CommentType[];
  commentCount: number;
};

function CommentHead({ commentCount }: { commentCount: number }) {
  return (
    <div className="mx-2 lg:mx-0 p-2 border border-neutral-300 rounded-md bg-neutral-50">
      <span className="text-xs">댓글 {commentCount} 개</span>
    </div>
  );
}

export default function CommentUi({ commentData, commentCount }: Props) {
  return (
    <div className="mt-4">
      <CommentHead commentCount={commentCount} />
      <CommentList comments={commentData} />
      <CommentForm />
    </div>
  );
}
