export type FetchCommentRequestParams = {
  content: string;
  parent_comment_id?: number;
};

export type FetchCommentResponseDto = {
  comment_id: number;
  post_id: string;
  author_id: number;
  author_nickname: string;
  content: string;
  created_at: Date;
  tags: string[];
  parent_comment_id: number | null;
  recomment_count?: number;
};
