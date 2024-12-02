export type CreatePostingRequestParams = {
  image1: File;
  image2: File | null;
  image3: File | null;
  content: string;
  is_with_teacher: boolean;
};

export type CreatePostingResponseDto = {
  post_id: string;
};
