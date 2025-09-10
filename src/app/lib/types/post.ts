export type PostListType = {
  id: number;
  abbr: string;
  gallName: string;
  title: string;
  nickname: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  ipAddress: string;
  isLogin: boolean;
  createdAt: string;
};

export type PostListData = {
  postList: PostListType[];
  count: number;
};

export type PostType = {
  id: number;
  nickname: string;
  title: string;
  content: object;
  abbr: string;
  gallName: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  isLogin: boolean;
  ipAddress: string;
  createdAt: string;
};
