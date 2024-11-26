import { useNavigate } from 'react-router-dom';

import AuthInput from '@/components/auth/AuthInput';
import Button from '@/components/common/Button';
import { useState } from 'react';

const STEP = {
  INPUT_PHONE: 1, // 전화번호 입력
  DISPLAY_EMAIL: 2, // 이메일 결과 표시
};

const FindPasswordPage = () => {
  const [step, setStep] = useState(STEP.INPUT_PHONE);
  const navigate = useNavigate();

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    if (step === STEP.INPUT_PHONE) {
      // 전화번호 입력 후 다음 단계로 이동
      setStep(STEP.DISPLAY_EMAIL);
    }
  };

  return (
    <form className='flex h-svh flex-col px-[28px] py-[30px]'>
      <div className='flex-grow'>
        <div className='pt-[89px]'>
          <h1 className='mb-1 font-gMarket text-[43px] text-mainLogoTextColor'>
            수행쌤
          </h1>
          <div className='mb-[50px] text-lg text-captionColor'>
            <p className='font-semibold text-textMainColor'>비밀번호 찾기</p>
            {step === STEP.INPUT_PHONE && (
              <div className='mt-3'>
                <p className='text-base'>비밀번호를 찾으려면 가입 시 사용한</p>
                <p className='text-base'>이메일을 입력해주세요.</p>
              </div>
            )}
          </div>
          {step === STEP.INPUT_PHONE && (
            <div className='flex flex-col gap-4'>
              <AuthInput
                type='email'
                placeholder='example@email.com'
                label='이메일'
              />
            </div>
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
          <Button onClick={handleNext}>다음</Button>
        )}
        {step === STEP.DISPLAY_EMAIL && (
          <>
            <Button onClick={() => navigate('/login')}>로그인하기</Button>
            <Button variant='cancel' onClick={() => navigate('/find/email')}>
              아이디 찾기
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default FindPasswordPage;
