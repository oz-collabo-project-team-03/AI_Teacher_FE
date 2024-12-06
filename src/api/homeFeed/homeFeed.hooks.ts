import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  InfiniteData,
} from '@tanstack/react-query';
import { getAllPostsAPI } from './homeFeedAPI';
import { PostListResponseDto } from '@/types/postType';

export const useAllPostsInfiniteGetQuery = (
  options?: UseInfiniteQueryOptions<
    PostListResponseDto,
    Error,
    InfiniteData<PostListResponseDto>
  >
) => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getAllPostsAPI(pageParam as number);

      return response;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) {
        return undefined;
      }
      const nextPage = lastPage.next.split('page=')[1];
      return nextPage ? parseInt(nextPage) : undefined;
    },
    initialPageParam: 1,
    ...options,
  });
};
