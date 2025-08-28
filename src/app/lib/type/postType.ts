export type PostListType = {
  id: number;
  abbr: string;
  gall_name: string;
  title: string;
  nickname: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  ip_address: string;
  is_login: boolean;
  created_at: string;
};

export type PostListData = {
  postList: PostListType[];
  count: number;
};
