import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getMyProfileAPI, getUserProfileAPI } from './myPageAPI';

import { Cookies } from 'react-cookie';
import { MyPageResponseDto } from '@/types/myPageType';

const cookie = new Cookies();

export const useProfileGetQuery = (
  userId?: number,
  options?: UseQueryOptions<MyPageResponseDto, Error>
) => {
  const pathname = window.location.pathname;

  return useQuery({
    queryKey: ['profile', userId, pathname], // 경로도 키에 추가
    queryFn: async () => {
      // console.log('Executing queryFn with:', { userId });

      try {
        if (userId) {
          // 다른 사용자 기본 프로필 조회
          // console.log('Fetching user profile for userId:', userId);
          const userProfile = await getUserProfileAPI(userId);
          // console.log('User profile fetched:', userProfile);

          // studyGroup이 없다면 내 프로필에서 가져오기
          if (!userProfile.study_group) {
            // console.log('No studyGroup in user profile, fetching my profile');
            const myProfile = await getMyProfileAPI();
            // console.log('My profile fetched:', myProfile);

            const combinedProfile = {
              ...userProfile,
              study_group: myProfile.study_group,
            };
            // console.log('Combined profile:', combinedProfile);
            return combinedProfile;
          }

          return userProfile;
        } else {
          // 내 프로필 조회
          // console.log('Fetching my profile');
          const myProfile = await getMyProfileAPI();
          // console.log('My profile fetched:', myProfile);
          return myProfile;
        }
      } catch (error) {
        // console.error('Error in profile query:', error);
        throw error;
      }
    },
    enabled: !!cookie.get('accessToken') && !pathname.includes('member-agree'),
    retry: 1, // API 오류 시 한 번만 재시도
    // staleTime: 0, // 필요할 때 즉시 새로운 데이터를 가져오기
    refetchOnWindowFocus: false, // 탭 전환 시 불필요한 리패치를 방지
    refetchOnReconnect: false, // 네트워크 재연결 시 자동 리패치를 방지합니다
    // gcTime: 1000 * 60 * 5, // 캐시된 데이터를 5분간 유지
    ...options,
  });
};
