import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  InfiniteData,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PostListResponse } from '@/types/postType';
import { getAllPostsAPI } from './homeFeedAPI';

export const useAllPostsInfiniteGetQuery = (
  options?: UseInfiniteQueryOptions<
    PostListResponse,
    AxiosError,
    InfiniteData<PostListResponse>,
    PostListResponse,
    (string | undefined)[]
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
