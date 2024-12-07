import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getMyProfileAPI, getUserProfileAPI } from './myPageAPI';
import { MyPageResponseDto } from '@/types/myPageType';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

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
    enabled: !!cookie.get('accessToken'),
    retry: 1, // API 오류 시 한 번만 재시도
    staleTime: 0, // 필요할 때 즉시 새로운 데이터를 가져오기
    refetchOnWindowFocus: false, // 탭 전환 시 불필요한 리패치를 방지
    refetchOnReconnect: false, // 네트워크 재연결 시 자동 리패치를 방지합니다
    gcTime: 1000 * 60 * 5, // 캐시된 데이터를 5분간 유지
    ...options,
  });
};
