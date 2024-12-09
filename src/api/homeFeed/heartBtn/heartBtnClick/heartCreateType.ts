export type HeartCreateRequestParams = {
  post_id: string;
  like: boolean;
};

export type HeartCreateResponseDto = {
  post_id: string;
  user_id: number;
  liked: boolean;
};
