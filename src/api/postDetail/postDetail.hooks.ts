import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PostDetailResponse } from '@/types/postDetail';
import { getMyPostsAPI, getUserPostsAPI } from './postDetailAPI';

export const usePostsInfiniteGetQuery = (
  userId?: string,
  options?: UseInfiniteQueryOptions<PostDetailResponse, AxiosError>
) => {
  return useInfiniteQuery({
    queryKey: ['posts', userId],
    queryFn: () => {
      if (userId) {
        return getUserPostsAPI(userId);
      }
      return getMyPostsAPI();
    },
    getNextPageParam: (lastPage) => {
      console.log('Last Page for Pagination:', lastPage);
      // if (!lastPage.next) return undefined;
      // const nextPage = new URL(lastPage.next).searchParams.get('page');
      // return nextPage ? Number(nextPage) : undefined;
    },
    initialPageParam: 1,
    ...options,
  });
};
