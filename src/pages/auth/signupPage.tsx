import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthInput from '../../components/auth/AuthInput';
import { GradeSelector } from '../../components/auth/GradeButton';
import Button from '../../components/common/Button';

const STEP = {
  ACCOUNT_INFO: 1,
  PERSONAL_INFO: 2,
};

const SignupPage = () => {
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const { role: roleParam } = useParams(); // URL에서 role 파라미터를 직접 추출
  const navigate = useNavigate();
  const [step, setStep] = useState(STEP.ACCOUNT_INFO);

  useEffect(() => {
    console.log('roleParam:', roleParam); // 디버깅 로그 추가
    if (roleParam === 'student' || roleParam === 'teacher') {
      setRole(role);
    } else {
      // 잘못된 role 파라미터인 경우
      navigate('/error');
    }
  }, [roleParam, navigate]);

  const handleNext = () => {
    if (step === STEP.ACCOUNT_INFO) {
      console.log('햇다쳐');
      setStep(STEP.PERSONAL_INFO);
    } else {
      // 최종 회원가입 처리
      // 여기에서 서버로 데이터를 전송하는 로직을 구현
      console.log('회원가입 완료:');
      navigate('/signup-complete');
    }
  };
  return (
    <div className='flex h-svh flex-col px-[28px] py-[30px]'>
      <div className='flex-grow'>
        <div className='pt-[89px]'>
          <h1 className='mb-1 font-gMarket text-[43px] text-mainLogoTextColor'>
            수행쌤
          </h1>
          <div className='mb-[50px] text-lg text-captionColor'>
            {step === STEP.ACCOUNT_INFO && (
              <div>
                <p>새로운 계정 생성을 위해</p>
                <p>아이디와 비밀번호를 설정해 주세요.</p>
              </div>
            )}
            {step === STEP.PERSONAL_INFO && (
              <div>
                <p>계정을 완성하기 위해</p>
                <p>닉네임과 필요한 정보를 입력해주세요.</p>
              </div>
            )}
          </div>
          <div>
            {step === STEP.ACCOUNT_INFO && (
              <form className='flex flex-col gap-4'>
                <AuthInput
                  type='text'
                  placeholder='example@email.com'
                  label='아이디(이메일)'
                />
                <AuthInput
                  type='password'
                  placeholder='패스워드를 입력해주세요.'
                  label='패스워드'
                />
                <AuthInput
                  type='password'
                  placeholder='패스워드를 재입력해주세요.'
                  label='패스워드 확인'
                />
              </form>
            )}
            {step === STEP.PERSONAL_INFO && roleParam === 'student' && (
              <form className='flex flex-col gap-4'>
                <AuthInput
                  type='text'
                  placeholder='닉네임을 입력해주세요.'
                  label='닉네임'
                />
                <AuthInput
                  type='number'
                  placeholder='-없이 입력해주세요.'
                  label='연락처'
                />
                <AuthInput
                  type='text'
                  placeholder='학교 이름을 입력해주세요.'
                  label='학교'
                />
                <GradeSelector />
                <AuthInput
                  type='text'
                  placeholder='희망진로를 입력해주세요.'
                  label='희망진로'
                />
                <AuthInput
                  type='text'
                  placeholder='흥미를 입력해주세요.'
                  label='흥미'
                />
              </form>
            )}
            {step === STEP.PERSONAL_INFO && roleParam === 'teacher' && (
              <form className='flex flex-col gap-4'>
                <AuthInput
                  type='text'
                  placeholder='닉네임을 입력해주세요.'
                  label='닉네임'
                />
                <AuthInput
                  type='number'
                  placeholder='-없이 입력해주세요.'
                  label='연락처'
                />
                <AuthInput
                  type='text'
                  placeholder='소속종류를 입력해주세요.'
                  label='소속종류'
                />
                <AuthInput
                  type='text'
                  placeholder='소속이름을 입력해주세요'
                  label='소속이름'
                />
                <AuthInput
                  type='text'
                  placeholder='직급을 입력해주세요.'
                  label='직급'
                />
              </form>
            )}
          </div>
        </div>
      </div>
      <div className='mt-auto'>
        <Button variant='active' onClick={handleNext}>
          {step === STEP.ACCOUNT_INFO ? '다음' : '가입하기'}
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
