// 게시글 상세 정보 타입
export type PostDetail = {
  post_id: string;
  id: string;
  nickname: string;
  profile_image: string;
  career_aspiration: string;
  interest: string;
  like_count: number;
  comment_count: number;
  image1: string;
  image2: string | null;
  image3: string | null;
  content: string;
  teacher?: {
    nickname: string;
    profile_image: string;
  };
  created_at: string;
};

// 게시글 목록 응답 타입
export type PostListResponse = {
  next: string | null;
  previous: string | null;
  posts: PostDetail[];
};
