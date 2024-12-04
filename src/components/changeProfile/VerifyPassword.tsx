import { FormProvider } from 'react-hook-form';
import Button from '../common/Button';
import AuthInput from '../auth/AuthInput';
import { useVerifyPasswordForm } from '@/hooks/changeProfile/useVerifyPasswordForm';

type VerifyPasswordProps = {
  onUserVerifyPassword: () => void;
};

const VerifyPassword = ({ onUserVerifyPassword }: VerifyPasswordProps) => {
  const {
    form,
    register,
    formState: { errors },
    handleVerifypassword,
    isPending,
  } = useVerifyPasswordForm();

  const onSubmit = () => {
    handleVerifypassword();
    onUserVerifyPassword();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-4 px-4 pt-[54px]'
      >
        <span className='text-[15px] font-medium text-textMainColor'>
          현재 비밀번호를 입력해주세요.
        </span>
        <div className='flex w-full flex-col gap-2'>
          <AuthInput
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            {...register('password')}
          />
          {errors.password && (
            <span className='text-sm text-errorTextColor'>
              {errors.password.message}
            </span>
          )}
        </div>
        <Button type='submit' variant='active' disabled={isPending}>
          {isPending ? '확인 중...' : '확인'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default VerifyPassword;
