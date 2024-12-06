import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { Cookies } from 'react-cookie';
import { GetLoginResponse } from '@/api/auth/login/loginType';
import axios from 'axios';
import { useAuth } from '../useAuth';
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
          navigate('/teacher/managedList', { replace: true });
        }
      } else {
        if (data.role === 'student') {
          navigate('/student-main', { replace: true });
        } else if (data.role === 'teacher') {
          navigate('/teacher/managedList', { replace: true });
        }
      }
      cookies.set('accessToken', data.access_token);
      cookies.set('refreshToken', data.refresh_token);
    },
    onError: (error) => {
      // Axios 에러인 경우 더 상세한 로깅
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
        '로그인에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handlePostLogin = async () => {
    const formData = form.getValues();
    console.log('Login Attempt:', form.getValues());
    loginMutation(formData);
  };

  return {
    form,
    isPending,
    error,
    loginMutation: handlePostLogin,
  };
};
