import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getMyProfileAPI, getUserProfileAPI } from './myPageAPI';
import { MyPageResponseDto } from '@/types/myPageType';

export const useProfileGetQuery = (
  userId?: number,
  options?: UseQueryOptions<MyPageResponseDto, Error>
) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => {
      if (userId) {
        return getUserProfileAPI(userId);
      }
      return getMyProfileAPI();
    },
    enabled: userId === undefined || Boolean(userId),
    ...options,
    retry: 1, // 한 번 재시도
    staleTime: 1000 * 60 * 5,
  });
};
