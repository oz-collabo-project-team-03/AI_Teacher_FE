import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { FetchLikeResponseDto } from './fetchLikesType';
import { fetchLikeStatus } from './fetchLikesAPI';

export const useFetchLikeStatus = (
  post_id: string,
  options?: UseQueryOptions<FetchLikeResponseDto, Error>
) => {
  return useQuery<FetchLikeResponseDto, Error>({
    queryKey: ['likeStatus', post_id],
    queryFn: () => fetchLikeStatus(post_id),
    ...options,
  });
};
