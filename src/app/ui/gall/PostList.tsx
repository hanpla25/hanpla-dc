import Link from "next/link";

// --- Utils ---
import formatDate from "@/app/utils/formatDate";

// --- Icons ---
import { Eye, ThumbsUp } from "lucide-react";

// --- Types ---
import { PostListType } from "@/app/lib/types/post";

type Props = {
  abbr: string;
  isBest: boolean;
  postList: PostListType[];
  queryString: string | undefined;
};

function Title({
  title,
  commentCount,
}: {
  title: string;
  commentCount: number;
}) {
  return (
    <div className="px-2 flex items-center gap-2 font-medium">
      <span className="truncate">{title}</span>
      <span className="text-xs text-neutral-700 bg-neutral-200 rounded p-1">
        {commentCount}
      </span>
    </div>
  );
}

function Info({
  isBest,
  gallName,
  userName,
  ipAddress,
  isLogin,
  createdAt,
  viewCount,
  likeCount,
}: {
  isBest: boolean;
  gallName: string;
  userName: string;
  ipAddress: string;
  isLogin: boolean;
  createdAt: string;
  viewCount: number;
  likeCount: number;
}) {
  return (
    <div className="px-2 text-xs text-gray-500 flex flex-wrap gap-3 items-center">
      <span>
        {userName}
        {!isLogin && ` ${ipAddress}`}
      </span>

      <span>{formatDate(createdAt, `${isBest ? "relative" : "time"}`)}</span>

      <span className="flex items-center gap-1">
        <Eye size={14} />
        {viewCount}
      </span>

      <span className="flex items-center gap-1">
        <ThumbsUp size={14} />
        {likeCount}
      </span>

      {isBest && <span>{gallName}</span>}
    </div>
  );
}

export default function PostList({
  abbr,
  isBest,
  postList,
  queryString,
}: Props) {
  return (
    <div className="divide-y divide-neutral-200 min-h-[400px] mb-2">
      {postList.map((item) => (
        <Link
          key={item.id}
          href={`/${abbr}/${item.id}?${queryString || ""}`}
          className="block hover:bg-neutral-50 py-2"
        >
          <Title title={item.title} commentCount={item.commentCount} />
          <Info
            isBest={isBest}
            userName={item.nickname}
            ipAddress={item.ipAddress}
            isLogin={item.isLogin}
            createdAt={item.createdAt}
            viewCount={item.viewCount}
            likeCount={item.likeCount}
            gallName={item.gallName}
          />
        </Link>
      ))}
    </div>
  );
}
