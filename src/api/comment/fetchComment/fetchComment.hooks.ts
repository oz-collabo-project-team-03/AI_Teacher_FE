import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { CommentListResponseDto } from './fetchCommentType';
import { getFetchCommentAPI } from './fetchCommentAPI';

export const useFetchCommentQuery = (
  post_id: number,
  options?: UseQueryOptions<CommentListResponseDto, Error>
) => {
  return useQuery<CommentListResponseDto, Error>({
    queryKey: ['comments', post_id],
    queryFn: () => getFetchCommentAPI(post_id),
    ...options,
  });
};
