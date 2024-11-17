import { GradeSelector } from '../auth/GradeButton';
import AuthInput from '../common/AuthInput';
import Button from '../common/Button';

type InputText = {
  type: 'text' | 'password' | 'email' | 'number' | 'date';
  label: string;
  placeholder: string;
};

type EditAccountProps = {
  userType: 'student' | 'teacher';
};

const EditAccount = ({ userType }: EditAccountProps) => {
  const commonInputs: InputText[] = [
    { type: 'text', label: '아이디(이메일)', placeholder: 'example@email.com' },
    {
      type: 'password',
      label: '패스워드',
      placeholder: '패스워드를 입력해주세요',
    },
    {
      type: 'password',
      label: '패스워드 확인',
      placeholder: '패스워드를 재입력해주세요.',
    },
    { type: 'number', label: '연락처', placeholder: '-없이 입력해주세요.' },
  ];

  const studentInputs: InputText[] = [
    { type: 'text', label: '학교', placeholder: '학교 이름을 입력해주세요.' },
  ];

  const teacherInputs: InputText[] = [
    {
      type: 'text',
      label: '소속 종류',
      placeholder: '소속 종류를 입력해주세요.',
    },
    {
      type: 'text',
      label: '소속 이름',
      placeholder: '소속 이름을 입력해주세요.',
    },
    { type: 'text', label: '직급', placeholder: '직급을 입력해주세요.' },
  ];

  const inputTexts = [
    ...commonInputs,
    ...(userType === 'student' ? studentInputs : teacherInputs),
  ];

  return (
    <div className='flex h-full flex-col justify-between gap-4 px-4 pb-[48px] pt-[38px]'>
      <form className='flex flex-col gap-4'>
        {inputTexts.map(({ type, label, placeholder }) => (
          <AuthInput
            key={label}
            type={type}
            label={label}
            placeholder={placeholder}
          />
        ))}
        {userType === 'student' && <GradeSelector />}
      </form>
      <Button variant='active'>변경 내용 저장</Button>
    </div>
  );
};

export default EditAccount;
