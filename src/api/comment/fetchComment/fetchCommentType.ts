// 댓글 데이터 타입 정의
export type Comment = {
  comment_id: number;
  post_id: string;
  author_id: number;
  author_nickname: string;
  content: string;
  created_at: string;
  tags: string[];
  parent_comment_id: number | null;
  profile_image: string | null;
  recomment_count: number;
  children: Comment[]; // 대댓글 리스트 (재귀 구조)
  user_id: number;
};

// 댓글 리스트 응답 타입 정의
export type CommentListResponseDto = {
  comments: Comment[]; // 댓글 리스트
  total_count: number; // 전체 댓글 개수
};
