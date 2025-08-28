import Link from "next/link";

// --- Data ---
import { fetchPostListData } from "@/app/lib/data/gall-data";

// --- Utils ---
import formatDate from "@/app/utils/formatDate";

// --- UI ---
import EmptyUi from "../common/EmptyUi";

// --- Icons ---
import { Eye, ThumbsUp } from "lucide-react";

type Props = {
  abbr: string;
  currentPage: number;
  queryString: string;
};

const Title = ({
  title,
  commentCount,
}: {
  title: string;
  commentCount: number;
}) => {
  return (
    <div className="flex items-center gap-2 font-medium">
      <span className="truncate">{title}</span>
      <span className="text-xs text-neutral-700 bg-neutral-200 rounded">
        {commentCount}
      </span>
    </div>
  );
};

const Info = ({
  abbr,
  gallName,
  userName,
  ipAddress,
  isLogin,
  createdAt,
  viewCount,
  likeCount,
}: {
  abbr: string;
  gallName: string;
  userName: string;
  ipAddress: string;
  isLogin: boolean;
  createdAt: string;
  viewCount: number;
  likeCount: number;
}) => {
  return (
    <div className="text-xs text-gray-500 flex flex-wrap gap-3 items-center">
      <span>
        {userName}
        {!isLogin && ` ${ipAddress}`}
      </span>

      <span>
        {formatDate(createdAt, `${abbr === "best" ? "relative" : "time"}`)}
      </span>

      <span className="flex items-center gap-1">
        <Eye size={14} />
        {viewCount}
      </span>

      <span className="flex items-center gap-1">
        <ThumbsUp size={14} />
        {likeCount}
      </span>

      {abbr === "best" && <span>{gallName}</span>}
    </div>
  );
};

export default async function GallPostList({
  abbr,
  currentPage,
  queryString,
}: Props) {
  const postListData = await fetchPostListData({
    abbr,
    isPopular: true,
    page: currentPage,
  });

  if (postListData.postList.length === 0)
    return <EmptyUi text="아직 게시글이 없어요." />;

  return (
    <ul className="divide-y divide-neutral-200 min-h-[529px]">
      {postListData.postList.map((item) => (
        <li key={item.id} className="hover:bg-neutral-50 py-2">
          <Link href={`/${abbr}/${item.id}?${queryString}`} className="block">
            <Title title={item.title} commentCount={item.comment_count} />
            <Info
              abbr={abbr}
              userName={item.nickname}
              ipAddress={item.ip_address}
              isLogin={item.is_login}
              createdAt={item.created_at}
              viewCount={item.view_count}
              likeCount={item.like_count}
              gallName={item.gall_name}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
