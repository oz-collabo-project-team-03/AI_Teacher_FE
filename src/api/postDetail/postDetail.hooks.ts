import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  InfiniteData,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PostListResponse } from '@/types/postType';
import { getMyPostsAPI, getUserPostsAPI } from './postDetailAPI';

export const usePostsInfiniteGetQuery = (
  userId?: string,
  options?: UseInfiniteQueryOptions<
    PostListResponse,
    AxiosError,
    InfiniteData<PostListResponse>,
    PostListResponse,
    (string | undefined)[]
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
  });
};
