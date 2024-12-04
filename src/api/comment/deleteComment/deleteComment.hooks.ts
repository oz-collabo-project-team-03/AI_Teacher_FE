import {
  DeleteCommentParams,
  DeleteCommentResponseDto,
} from './deleteCommentType';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { deleteCommentAPI } from './deleteCommentAPI';

export const useDeleteCommentMutation = (
  options?: UseMutationOptions<
    DeleteCommentResponseDto,
    Error,
    DeleteCommentParams
  >
) => {
  return useMutation({
    mutationFn: deleteCommentAPI,
    ...options,
  });
};
