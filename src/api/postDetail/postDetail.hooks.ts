import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  InfiniteData,
} from '@tanstack/react-query';
import { getMyPostsAPI, getUserPostsAPI } from './postDetailAPI';
import { PostListResponseDto } from '@/types/postType';

export const useDetailPostsInfiniteGetQuery = (
  userId?: string,
  options?: UseInfiniteQueryOptions<
    PostListResponseDto,
    Error,
    InfiniteData<PostListResponseDto>
  >
) => {
  return useInfiniteQuery({
    queryKey: ['posts', userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = userId
        ? await getUserPostsAPI(userId, pageParam as number)
        : await getMyPostsAPI(pageParam as number);

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
    throwOnError: true,
  });
};
