import { useLoginMutation } from '@/api/auth/login/login.hooks';
import { LoginResponseDto } from '@/api/auth/login/loginType';
import googleLogo from '@/assets/auth/google_login.svg';
import kakaoLogo from '@/assets/auth/kakao_logo.png';
import naverLogo from '@/assets/auth/naver_logo.svg';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useToast } from '@/hooks/useToast';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';
//소셜로그인 버튼
const socialLogin = [
  { name: 'google', src: googleLogo, url: '/' },
  { name: 'kakao', src: kakaoLogo, url: '/' },
  { name: 'naver', src: naverLogo, url: '/' },
];

// 로그인 폼 스키마 정의
const loginFormSchema = zod.object({
  // 이메일 형식 지정
  email: zod.string().email({ message: '이메일 형식이 아닙니다.' }),
  password: zod.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

const LoginPage = () => {
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

  const {
    register,
    formState: { errors },
    getValues,
  } = form;

  /**로그인 함수 */
  const { mutate: LoginMutation } = useLoginMutation({
    onSuccess: (data: LoginResponseDto) => {
      if (data.user.role === 'student') {
        navigate('/student-main', { replace: true });
      } else if (data.user.role === 'teacher') {
        navigate('/teacher-main', { replace: true });
      }
      cookies.set('accessToken', data.user.access_token);
      cookies.set('refreshToken', data.user.refresh_token);
    },
    onError: (error) => {
      console.error('Login Error:', error); // 에러 상세 로깅

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
    console.log('Login Attempt:', getValues());
    const form = getValues();
    LoginMutation(form);
  };

  return (
    <FormProvider {...form}>
      <div className='flex h-lvh w-full items-center px-7 text-textMainColor'>
        <div className='w-full'>
          <div className='mb-[34px] flex flex-col gap-y-[9px]'>
            <h1 className='font-gMarket text-[40px] text-mainLogoTextColor'>
              수행쌤
            </h1>
            <p className='text-sm text-captionColor'>
              활동 주제 선정부터 후속계획까지 코칭하는
            </p>
          </div>
          <form
            className='mb-[38px] flex flex-col gap-y-[14px]'
            onSubmit={form.handleSubmit(handleLogin)}
            autoComplete='off'
          >
            <div>
              <Input
                type='text'
                placeholder='아이디 입력'
                {...register('email')}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-errorTextColor'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type='password'
                placeholder='비밀번호 입력'
                {...register('password')}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-errorTextColor'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button>로그인</Button>
          </form>
          <div className='mb-[34px] flex items-center justify-center gap-[20px] text-sm text-mainLogoTextColor'>
            <Link to={'/find/email'}>
              <p className='cursor-pointer'>아이디 찾기</p>
            </Link>
            <span className='inline-block h-[14px] w-[1px] bg-inputBorderColor'></span>
            <Link to={'/find/password'}>
              <p className='cursor-pointer'>비밀번호 찾기</p>
            </Link>
            <span className='inline-block h-[14px] w-[1px] bg-inputBorderColor'></span>
            <Link to='/member-agree'>
              <p className='cursor-pointer'>회원가입</p>
            </Link>
          </div>
          <div className='mt-5 flex flex-row justify-center gap-x-[36px]'>
            {socialLogin.map(({ name, src, url }) => (
              <a
                key={name}
                href={url}
                className='h-[50px] w-[50px] cursor-pointer overflow-hidden rounded-[7px]'
              >
                <img
                  src={src}
                  alt={name}
                  className='h-full w-full object-cover'
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
export default LoginPage;
