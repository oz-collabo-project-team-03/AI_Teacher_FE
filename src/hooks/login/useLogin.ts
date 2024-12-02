import { useLoginMutation } from '@/api/auth/login/login.hooks';
import { LoginResponseDto } from '@/api/auth/login/loginType';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';
import { useToast } from '../useToast';

// 로그인 폼 스키마 정의
export const loginFormSchema = zod.object({
  // 이메일 형식 지정
  email: zod.string().email({ message: '이메일 형식이 아닙니다.' }),
  password: zod.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

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
  const { mutate: LoginMutation } = useLoginMutation({
    onSuccess: (data: LoginResponseDto) => {
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

  const handleLogin = async () => {
    const formData = form.getValues();
    console.log('Login Attempt:', form.getValues());
    LoginMutation(formData);
  };

  return {
    form,
    handleLogin,
  };
};
