import { usePostLogoutMutation } from '@/api/auth/logout/logout.hooks';
import { LogoutResponseDto } from '@/api/auth/logout/logoutType';
import { useToast } from '@/hooks/useToast';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';
import { clearScrollPositions } from '../useScrollPosition';

export const useLogout = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { logout } = useAuth();

  const cookies = new Cookies();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = usePostLogoutMutation({
    onSuccess: (data: LogoutResponseDto) => {
      showToast(data.message);
      logout();
      clearScrollPositions(); // 스크롤 저장 초기화
      // 모든 쿠키 제거 (도메인 전체)
      const allCookies = cookies.getAll();
      Object.keys(allCookies).forEach((cookieName) =>
        cookies.remove(cookieName, { path: '/' })
      );

      navigate('/', { replace: true });
    },
    onError: (error) => {
      console.error('Logout Error:', error);

      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }

      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '로그아웃에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
      logout();
    },
  });

  /** 로그아웃 요청 핸들러*/
  const handlePostLogout = () => {
    const accessToken = cookies.get('accessToken');
    logoutMutation(accessToken);
  };

  return { logoutMutation: handlePostLogout, isPending, error };
};
