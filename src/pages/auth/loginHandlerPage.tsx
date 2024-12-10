import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { Cookies } from 'react-cookie';
import ErrorPage from '../status/errorPage';
import { GetSocialLoginResponse } from '@/api/social/socialType';
import LoadingPage from '../status/loadingPage';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocialLoginCallbackMutation } from '@/api/social/social.hooks';
import { useToast } from '@/hooks/useToast';

const LoginHandlerPage = () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const provider = url.pathname.split('/').pop();

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();
  const cookies = new Cookies();

  const {
    mutate: socialLoginMutation,
    isPending,
    error,
  } = useSocialLoginCallbackMutation({
    onSuccess: (data: GetSocialLoginResponse) => {
      login(data.id);

      cookies.set('accessToken', data.access_token);
      cookies.set('refreshToken', data.refresh_token);

      if (data.first_login) {
        navigate('/member-agree?social=true', {
          state: { isFirstLogin: data.first_login },
        });
      } else {
        navigate(data?.role === 'student' ? '/student-main' : '/teacher-main');
      }
    },
    onError: (error) => {
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
      }
      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '소셜로그인에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  useEffect(() => {
    if (provider && code) {
      socialLoginMutation({ provider, code });
    }
  }, [provider, code, socialLoginMutation]);

  if (isPending) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <div>
      <LoadingPage />
    </div>
  );
};

export default LoginHandlerPage;
