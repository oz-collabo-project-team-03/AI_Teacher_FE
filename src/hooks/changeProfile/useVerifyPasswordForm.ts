import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { VerifyPasswordRequestParams } from '@/api/auth/changeProfile/verifyPassword/verifyPasswordType';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { useVerifyPasswordMutation } from '@/api/auth/changeProfile/verifyPassword/verifyPassword.hooks';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const verifyPasswordSchema = zod.object({
  password: zod.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export const useVerifyPasswordForm = (onUserVerifyPassword: () => void) => {
  const { showToast } = useToast();

  const form = useForm<VerifyPasswordRequestParams>({
    resolver: zodResolver(verifyPasswordSchema),
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
    getValues,
  } = form;

  const { mutate: verifyPasswordMutation, isPending } =
    useVerifyPasswordMutation({
      onSuccess: () => {
        onUserVerifyPassword();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
         
        }

        const apiError = error as ApiErrorResponseDto;
        const errorMessage =
          apiError?.response?.data?.message ||
          '비밀번호 확인에 실패하였습니다. 다시 시도해주세요.';
        showToast(errorMessage);
      },
    });

  const handleVerifypassword = () => {
    const formData = form.getValues();
    verifyPasswordMutation(formData);
  };

  return {
    form,
    register,
    formState: { errors },
    handleVerifypassword,
    isPending,
    getValues,
  };
};
