import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthInput from '../../components/auth/AuthInput';
import { GradeSelector } from '../../components/auth/GradeButton';
import Button from '../../components/common/Button';

const SignupPage = () => {
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');

    if (roleParam === 'student' || roleParam === 'teacher') {
      setRole(roleParam);
    } else {
      // 잘못된 role 파라미터인 경우
      navigate('/error');
    }
  }, [location, navigate]);

  const handleNext = () => {
    if (step === 1) {
      console.log('햇다쳐');
      setStep(2);
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
            {step === 1 ? (
              <>
                <p>새로운 계정 생성을 위해</p>
                <p>아이디와 비밀번호를 설정해 주세요.</p>
              </>
            ) : (
              <>
                <p>계정을 완성하기 위해</p>
                <p>닉네임과 필요한 정보를 입력해주세요.</p>
              </>
            )}
          </div>
          <div>
            {step === 1 ? (
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
            ) : (
              <>
                {role === 'student' && (
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
                {role === 'teacher' && (
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
              </>
            )}
          </div>
        </div>
      </div>
      <div className='mt-auto'>
        <Button variant='active' onClick={handleNext}>
          {step === 1 ? '다음' : '가입하기'}
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
