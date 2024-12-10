export type UpdatePostingRequestParams = {
  image1: File;
  image2: File | null;
  image3: File | null;
  content: string;
  is_with_teacher?: boolean;
};

export type GetUpdatePostingResponse = {
  post_id: string;
};
