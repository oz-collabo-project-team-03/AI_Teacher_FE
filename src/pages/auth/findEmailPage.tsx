import { useNavigate } from 'react-router-dom';

import { useFindEmailMutation } from '@/api/auth/findEmail/findEmail.hooks';
import { FindEmailResponseDto } from '@/api/auth/findEmail/findEmailType';
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

const phoneSchema = zod.object({
  phone: zod
    .string()
    .regex(/^0\d{9,10}$/, '전화번호 형식이 유효하지 않습니다.'),
});

const FindEmailPage = () => {
  const [step, setStep] = useState(STEP.INPUT_PHONE);
  const [findEmail, setFindEmail] = useState('');

  const navigate = useNavigate();
  const { showToast } = useToast();

  const form = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
    getValues,
  } = form;

  const { mutate: FindEmailMutation } = useFindEmailMutation({
    onSuccess: (data: FindEmailResponseDto) => {
      setFindEmail(data.email);
      setStep(STEP.DISPLAY_EMAIL);
    },
    onError: (error) => {
      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '이메일찾기에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handleFindEmail = async () => {
    const phone = getValues();
    FindEmailMutation(phone);
  };

  return (
    <FormProvider {...form}>
      <form
        className='flex h-svh flex-col px-[28px] py-[30px]'
        onSubmit={form.handleSubmit(handleFindEmail)}
        autoComplete='off'
      >
        <div className='flex-grow'>
          <div className='pt-[89px]'>
            <h1 className='mb-1 font-gMarket text-[43px] text-mainLogoTextColor'>
              수행쌤
            </h1>
            <div className='mb-[50px] text-lg text-captionColor'>
              <p className='font-semibold text-textMainColor'>이메일 찾기</p>
              {step === STEP.INPUT_PHONE && (
                <div className='mt-3'>
                  <p className='text-base'>
                    이메일 주소를 찾으려면 가입 시 사용한
                  </p>
                  <p className='text-base'>전화번호를 입력해주세요.</p>
                </div>
              )}
              {step === STEP.DISPLAY_EMAIL && (
                <div className='mt-3'>
                  <p className='text-base'>
                    고객님의 정보와 일치하는 아이디 목록입니다.
                  </p>
                </div>
              )}
            </div>
            {step === STEP.INPUT_PHONE && (
              <>
                <div className='flex flex-col gap-4'>
                  <AuthInput
                    type='text'
                    placeholder='-없이 입력해주세요.'
                    label='연락처'
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <p className='mt-1 text-sm text-errorTextColor'>
                    {errors.phone.message}
                  </p>
                )}
              </>
            )}
            {step === STEP.DISPLAY_EMAIL && (
              <ul className='flex flex-col items-center gap-4'>
                <li className='font-medium'>{findEmail}</li>
              </ul>
            )}
          </div>
        </div>
        <div className='mt-auto flex flex-col gap-4'>
          {step === STEP.INPUT_PHONE && (
            <Button onClick={handleFindEmail}>다음</Button>
          )}
          {step === STEP.DISPLAY_EMAIL && (
            <>
              <Button onClick={() => navigate('/login', { replace: true })}>
                로그인하기
              </Button>
              <Button
                variant='cancel'
                onClick={() => navigate('/find/password')}
              >
                비밀번호 찾기
              </Button>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default FindEmailPage;
