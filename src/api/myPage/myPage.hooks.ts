import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MyPageResponseData } from '@/types/myPageType';
import { fetchProfileAPI } from './myPageAPI';

export const useProfileQuery = (
  options?: UseQueryOptions<MyPageResponseData, AxiosError, MyPageResponseData>
) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfileAPI,
    ...options,
  });
};
