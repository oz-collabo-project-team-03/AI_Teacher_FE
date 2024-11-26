import { useNavigate } from 'react-router-dom';

import { useResetPasswordMutation } from '@/api/auth/resetPassword/resetPassword.hooks';
import { ResetPasswordResponseDto } from '@/api/auth/resetPassword/resetPasswordType';
import AuthInput from '@/components/auth/AuthInput';
import Button from '@/components/common/Button';
import { useToast } from '@/hooks/useToast';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

const STEP = {
  INPUT_PHONE: 1, // 전화번호 입력
  DISPLAY_EMAIL: 2, // 이메일 결과 표시
};
const emailSchema = zod.object({
  email: zod.string().email({ message: '이메일 형식이 아닙니다.' }),
});

const ResetPasswordPage = () => {
  const [step, setStep] = useState(STEP.INPUT_PHONE);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
    getValues,
  } = form;

  const { mutate: ResetPasswordMutation } = useResetPasswordMutation({
    onSuccess: (data: ResetPasswordResponseDto) => {
      setStep(STEP.DISPLAY_EMAIL);
      showToast(data.message);
    },
    onError: (error) => {
      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '비밀번호 재설정에 실패했습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handleResetPassword = async () => {
    const email = getValues();
    ResetPasswordMutation(email);
  };

  return (
    <FormProvider {...form}>
      <form
        className='flex h-svh flex-col px-[28px] py-[30px]'
        onSubmit={form.handleSubmit(handleResetPassword)}
        autoComplete='off'
      >
        <div className='flex-grow'>
          <div className='pt-[89px]'>
            <h1 className='mb-1 font-gMarket text-[43px] text-mainLogoTextColor'>
              수행쌤
            </h1>
            <div className='mb-[50px] text-lg text-captionColor'>
              <p className='font-semibold text-textMainColor'>비밀번호 찾기</p>
              {step === STEP.INPUT_PHONE && (
                <div className='mt-3'>
                  <p className='text-base'>
                    비밀번호를 찾으려면 가입 시 사용한
                  </p>
                  <p className='text-base'>이메일을 입력해주세요.</p>
                </div>
              )}
            </div>
            {step === STEP.INPUT_PHONE && (
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
            {step === STEP.DISPLAY_EMAIL && (
              <div className='flex h-full flex-col items-center gap-1'>
                <p>입력하신 이메일로 임시비밀번호를 발송했습니다.</p>
                <p>메일함을 확인해주세요.</p>
              </div>
            )}
          </div>
        </div>
        <div className='mt-auto flex flex-col gap-4'>
          {step === STEP.INPUT_PHONE && (
            <Button onClick={handleResetPassword}>다음</Button>
          )}
          {step === STEP.DISPLAY_EMAIL && (
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
