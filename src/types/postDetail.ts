// 게시글 정보 응답 타입
export type PostDetailResponse = {
  next: string | null;
  previous: string | null;
  posts: Array<{
    post_id: string;
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
    teacher: {
      nickname: string;
      profile_image: string;
    };
    created_at: string;
  }>;
};
