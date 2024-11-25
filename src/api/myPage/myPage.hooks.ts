import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MyPageResponseData } from '@/types/myPageType';
import { fetchProfileAPI, fetchUserProfileAPI } from './myPageAPI';

export const useProfileQuery = (
  userId?: string,
  options?: UseQueryOptions<MyPageResponseData, AxiosError, MyPageResponseData>
) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => {
      if (userId) {
        return fetchUserProfileAPI(userId);
      }
      return fetchProfileAPI();
    },
    enabled: userId === undefined || Boolean(userId),
    ...options,
  });
};
