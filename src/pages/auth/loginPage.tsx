import googleLogo from '@/assets/auth/google_login.svg';
import kakaoLogo from '@/assets/auth/kakao_logo.png';
import naverLogo from '@/assets/auth/naver_logo.svg';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useLogin } from '@/hooks/login/useLogin';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

//소셜로그인 버튼
const socialLogin = [
  { name: 'google', src: googleLogo, url: '/' },
  { name: 'kakao', src: kakaoLogo, url: '/' },
  { name: 'naver', src: naverLogo, url: '/' },
];

const LoginPage = () => {
  const { form, loginMutation } = useLogin();

  const {
    register,
    formState: { errors },
  } = form;

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
            onSubmit={form.handleSubmit(loginMutation)}
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
            <Link to={'/reset/password'}>
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
