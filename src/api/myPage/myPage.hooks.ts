import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getMyProfileAPI, getUserProfileAPI } from './myPageAPI';
import { MyPageResponseDto } from '@/types/myPageType';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

export const useProfileGetQuery = (
  userId?: number,
  options?: UseQueryOptions<MyPageResponseDto, Error>
) => {
  const pathname = window.location.pathname;

  return useQuery({
    queryKey: ['profile', userId, pathname], // 경로도 키에 추가
    queryFn: () => {
      return userId ? getUserProfileAPI(userId) : getMyProfileAPI();
    },
    gcTime: 1000 * 60 * 5, // 캐시된 데이터를 5분간 유지
    enabled: !!cookie.get('accessToken') && !pathname.includes('member-agree'),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
  });
};
