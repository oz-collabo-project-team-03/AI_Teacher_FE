import Input from '../common/Input';
import Button from '../common/Button';

type PwCheckProps = {
  onVerify: () => void;
};

const PwCheck = ({ onVerify }: PwCheckProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 확인 로직...

    // 비밀번호 확인이 성공하면
    onVerify();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center gap-4 px-4 pt-[54px]'
    >
      <span className='text-[15px] font-medium text-textMainColor'>
        현재 비밀번호를 입력해주세요.
      </span>
      <Input type='text' placeholder='비밀번호를 입력해주세요.' />
      <Button type='submit' variant='active'>
        확인
      </Button>
    </form>
  );
};

export default PwCheck;
