import { GradeSelector } from '../auth/GradeButton';
import AuthInput from '../auth/AuthInput';
import Button from '../common/Button';

type EditAccountProps = {
  userType: 'student' | 'teacher';
};

const EditAccount = ({ userType }: EditAccountProps) => {
  return (
    <div className='flex h-full flex-col justify-between gap-4 px-4 pb-[48px] pt-[38px]'>
      <form className='flex flex-col gap-4'>
        {/* 공통 입력 필드 */}
        <AuthInput
          type='text'
          label='아이디(이메일)'
          placeholder='example@email.com'
        />
        <AuthInput
          type='password'
          label='패스워드'
          placeholder='패스워드를 입력해주세요'
        />
        <AuthInput
          type='password'
          label='패스워드 확인'
          placeholder='패스워드를 재입력해주세요.'
        />
        <AuthInput
          type='number'
          label='연락처'
          placeholder='-없이 입력해주세요.'
        />

        {/* 학생 전용 입력 필드 */}
        {userType === 'student' && (
          <>
            <AuthInput
              type='text'
              label='학교'
              placeholder='학교 이름을 입력해주세요.'
            />
            <GradeSelector />
          </>
        )}

        {/* 교사 전용 입력 필드 */}
        {userType === 'teacher' && (
          <>
            <AuthInput
              type='text'
              label='소속 종류'
              placeholder='소속 종류를 입력해주세요.'
            />
            <AuthInput
              type='text'
              label='소속 이름'
              placeholder='소속 이름을 입력해주세요.'
            />
            <AuthInput
              type='text'
              label='직급'
              placeholder='직급을 입력해주세요.'
            />
          </>
        )}
      </form>
      <Button variant='active'>변경 내용 저장</Button>
    </div>
  );
};

export default EditAccount;
