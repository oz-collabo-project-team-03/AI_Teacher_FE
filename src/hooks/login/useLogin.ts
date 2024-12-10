import { ApiError } from '@/types/apiErrorType';
import { Cookies } from 'react-cookie';
import { GetLoginResponse } from '@/api/auth/login/loginType';
import axios from 'axios';
import { useAuth } from '../useAuth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { usePostLoginMutation } from '@/api/auth/login/login.hooks';
import { useToast } from '../useToast';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 로그인 폼 스키마 정의
export const loginFormSchema = zod.object({
  // 이메일 형식 지정
  email: zod.string().email({ message: '이메일 형식이 아닙니다.' }),
  password: zod.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const cookies = new Cookies();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  /**로그인 함수 */
  const {
    mutate: loginMutation,
    isPending,
    error,
  } = usePostLoginMutation({
    onSuccess: (data: GetLoginResponse) => {
      // 로그인 성공 시 userId 설정
      login(data.id);

      if (data.first_login) {
        if (data.role === 'student') {
          navigate('/student-main', {
            replace: true,
            state: { isFirstLogin: true },
          });
        } else if (data.role === 'teacher') {
          navigate('/teacher-main', { replace: true });
        }
      } else {
        if (data.role === 'student') {
          navigate('/student-main', { replace: true });
        } else if (data.role === 'teacher') {
          navigate('/teacher-main', { replace: true });
        }
      }
      // 기존 토큰 모두 제거
      cookies.remove('accessToken', { path: '/' });
      cookies.remove('accessToken', { path: '/student' });
      cookies.remove('accessToken', { path: '/teacher' });

      cookies.set('accessToken', data.access_token, { path: '/' });
    },
    onError: (error) => {
    
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
     
      }

      const apiError = error as ApiError;
      const errorMessage =
        apiError?.originalError.response?.data?.detail ||
        '로그인에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handlePostLogin = async () => {
    const formData = form.getValues();
   
    loginMutation(formData);
  };

  useEffect(() => {
    // 중복 토큰 제거
    const tokens = cookies.getAll();
    const accessTokens = Object.keys(tokens).filter((key) =>
      key.includes('accessToken')
    );

    if (accessTokens.length > 1) {
      accessTokens.forEach((tokenKey) => {
        cookies.remove(tokenKey, { path: '/' });
      });
      // 가장 최근의 토큰만 남기기
      cookies.set(
        'accessToken',
        tokens[accessTokens[accessTokens.length - 1]],
        { path: '/' }
      );
    }
  }, []);

  return {
    form,
    isPending,
    error,
    loginMutation: handlePostLogin,
  };
};
