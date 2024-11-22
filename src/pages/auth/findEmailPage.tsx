import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';

const FindEmailPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-svh flex-col px-[28px] py-[30px]'>
      <div className='flex-grow'>
        <div className='pt-[89px]'>
          <h1 className='mb-1 font-gMarket text-[43px] text-mainLogoTextColor'>
            수행쌤
          </h1>
          <div className='mb-[50px] text-lg text-captionColor'>
            <p>새로운 계정 생성을 위해</p>
            <p>아이디와 비밀번호를 설정해 주세요.</p>
          </div>
          <div>
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
          </div>
        </div>
      </div>
      <div className='mt-auto'>
        <Button variant='active'>로그인하기</Button>
        <Button variant='active'>비밀번호 찾기</Button>
      </div>
    </div>
  );
};

export default FindEmailPage;
