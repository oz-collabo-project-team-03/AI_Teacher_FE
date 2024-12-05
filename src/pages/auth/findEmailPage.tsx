import { useNavigate } from 'react-router-dom';

import AuthInput from '@/components/auth/AuthInput';
import Button from '@/components/common/Button';
import { useFindEmail } from '@/hooks/findEmail/useFindEmail';
import { FormProvider } from 'react-hook-form';
import ErrorPage from '../status/errorPage';
import LoadingPage from '../status/loadingPage';

const FindEmailPage = () => {
  const {
    form,
    step,
    findEmail,
    FIND_EMAIL_STEP,
    findEmailMutation,
    isPending,
    error,
  } = useFindEmail();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = form;

  if (isPending) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <FormProvider {...form}>
      <form
        className='flex h-svh flex-col px-[28px] py-[30px]'
        onSubmit={form.handleSubmit(findEmailMutation)}
        autoComplete='off'
      >
        <div className='flex-grow'>
          <div className='pt-[89px]'>
            <h1 className='mb-1 font-gMarket text-[43px] text-mainLogoTextColor'>
              수행쌤
            </h1>
            <div className='mb-[50px] text-lg text-captionColor'>
              <p className='font-semibold text-textMainColor'>이메일 찾기</p>
              {step === FIND_EMAIL_STEP.INPUT_PHONE && (
                <div className='mb-[50px] mt-3'>
                  <p className='text-base'>
                    이메일 주소를 찾으려면 가입 시 사용한
                  </p>
                  <p className='text-base'>전화번호를 입력해주세요.</p>
                </div>
              )}

              {step === FIND_EMAIL_STEP.INPUT_PHONE && (
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
            </div>
            {step === FIND_EMAIL_STEP.DISPLAY_EMAIL && (
              <div className='flex flex-col items-center gap-4 text-center'>
                <div>
                  <p className='text-base text-repleText'>
                    고객님의 정보와 일치하는 아이디 목록입니다.
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 px-6 py-4'>
                  <p className='font-medium text-textMainColor'>{findEmail}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='mt-auto flex flex-col gap-4'>
          {step === FIND_EMAIL_STEP.INPUT_PHONE && (
            <Button onClick={findEmailMutation}>다음</Button>
          )}
          {step === FIND_EMAIL_STEP.DISPLAY_EMAIL && (
            <>
              <Button onClick={() => navigate('/login', { replace: true })}>
                로그인하기
              </Button>
              <Button
                variant='cancel'
                onClick={() => navigate('/reset/password')}
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
