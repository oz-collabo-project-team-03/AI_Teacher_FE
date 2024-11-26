import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MyPageResponseData } from '@/types/myPageType';
import { getMyProfileAPI, getUserProfileAPI } from './myPageAPI';

export const useProfileGetQuery = (
  userId?: string,
  options?: UseQueryOptions<MyPageResponseData, AxiosError, MyPageResponseData>
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
  });
};
