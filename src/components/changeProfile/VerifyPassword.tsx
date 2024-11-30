import { FormProvider, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../common/Button';
import { useVerifyPasswordMutation } from '@/api/auth/changeProfile/verifyPassword/verifyPassword.hooks';
import AuthInput from '../auth/AuthInput';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { useToast } from '@/hooks/useToast';
import axios from 'axios';

const verifyPasswordSchema = zod.object({
  password: zod.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

type VerifyPasswordFormData = zod.infer<typeof verifyPasswordSchema>;

type VerifyPasswordProps = {
  onUserVerifyPassword: () => void;
};

const VerifyPassword = ({ onUserVerifyPassword }: VerifyPasswordProps) => {
  const { showToast } = useToast();

  const form = useForm<VerifyPasswordFormData>({
    resolver: zodResolver(verifyPasswordSchema),
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const verifyPasswordMutation = useVerifyPasswordMutation({
    onSuccess: () => {
      onUserVerifyPassword();
    },
    onError: (error) => {
      console.error('Login Error:', error);

      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }

      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '비밀번호 확인에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const onSubmit = (data: VerifyPasswordFormData) => {
    verifyPasswordMutation.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-4 px-4 pt-[54px]'
      >
        <span className='text-[15px] font-medium text-textMainColor'>
          현재 비밀번호를 입력해주세요.
        </span>
        <div className='flex flex-col w-full gap-2'>
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
        <Button
          type='submit'
          variant='active'
          disabled={verifyPasswordMutation.isPending}
        >
          {verifyPasswordMutation.isPending ? '확인 중...' : '확인'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default VerifyPassword;
