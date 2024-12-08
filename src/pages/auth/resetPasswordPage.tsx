import AuthInput from '@/components/auth/AuthInput';
import Button from '@/components/common/Button';
import { useResetPassword } from '@/hooks/resetPassword/useResetPassword';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../status/loadingPage';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const {
    form,
    step,
    tempEmail,
    isPending,
    error,
    resetPasswordMutation,
    RESET_PASSWORD_STEP,
  } = useResetPassword();

  const {
    register,
    formState: { errors },
  } = form;

  if (isPending) return <LoadingPage />;
  // if (error) return <ErrorPage />;
  return (
    <FormProvider {...form}>
      <form
        className='flex h-svh flex-col px-[28px] py-[30px]'
        onSubmit={form.handleSubmit(resetPasswordMutation)}
        autoComplete='off'
      >
        <div className='flex-grow'>
          <div className='pt-[89px]'>
            <h1 className='mb-1 font-gMarket text-[43px] text-mainLogoTextColor'>
              수행쌤
            </h1>
            <div className='mb-[50px] text-lg text-captionColor'>
              <p className='font-semibold text-textMainColor'>비밀번호 찾기</p>
              {step === RESET_PASSWORD_STEP.INPUT_EMAIL && (
                <div className='mt-3'>
                  <p className='text-base'>
                    비밀번호를 찾으려면 가입 시 사용한
                  </p>
                  <p className='text-base'>이메일을 입력해주세요.</p>
                </div>
              )}
            </div>
            {step === RESET_PASSWORD_STEP.INPUT_EMAIL && (
              <>
                <div className='flex flex-col gap-4'>
                  <AuthInput
                    type='email'
                    placeholder='example@email.com'
                    label='이메일'
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.email.message}
                  </p>
                )}
              </>
            )}
            {step === RESET_PASSWORD_STEP.DISPLAY_TEMP_PASSWORD && (
              <div className='flex h-full flex-col items-center gap-4'>
                <div className='text-center'>
                  <p className='mb-2'>임시 비밀번호가 발급되었습니다.</p>
                  <p className='text-sm text-repleText'>
                    발급된 임시 비밀번호로 로그인한 후,
                    <br /> 반드시 새 비밀번호로 변경해 주세요.
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-4'>
                  <p className='text-center'>
                    임시 비밀번호:{' '}
                    <span className='font-bold'>{tempEmail}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='mt-auto flex flex-col gap-4'>
          {step === RESET_PASSWORD_STEP.INPUT_EMAIL && (
            <Button onClick={resetPasswordMutation}>다음</Button>
          )}
          {step === RESET_PASSWORD_STEP.DISPLAY_TEMP_PASSWORD && (
            <>
              <Button onClick={() => navigate('/login', { replace: true })}>
                로그인하기
              </Button>
              <Button variant='cancel' onClick={() => navigate('/find/email')}>
                아이디 찾기
              </Button>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordPage;
