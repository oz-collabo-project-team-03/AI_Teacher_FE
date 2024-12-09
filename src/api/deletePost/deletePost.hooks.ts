import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { deletePostAPI } from './deletePostAPI';
import { DeletePostParams, GetDeletePostResponse } from './deletePostType';

export const useDeletePostMutation = (
  options?: UseMutationOptions<GetDeletePostResponse, Error, DeletePostParams>
) => {
  return useMutation({
    mutationFn: deletePostAPI,
    ...options,
  });
};
