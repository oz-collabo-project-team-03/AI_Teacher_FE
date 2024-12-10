import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { updatePostAPI } from './updatePostAPI';
import {
  GetUpdatePostingResponse,
  UpdatePostingRequestParams,
} from './updatePost.type';

export const useUpdatePostingMutation = (
  options?: UseMutationOptions<
    GetUpdatePostingResponse,
    Error,
    { postData: UpdatePostingRequestParams; postId: string }
  >
) => {
  return useMutation({
    mutationFn: ({ postId, postData }) => updatePostAPI(postId, postData),
    ...options,
  });
};
