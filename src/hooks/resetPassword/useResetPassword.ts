import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { usePostResetPasswordMutation } from '@/api/auth/resetPassword/resetPassword.hooks';
import { GetResetPasswordResponse } from '@/api/auth/resetPassword/resetPasswordType';
import { useToast } from '@/hooks/useToast';
import { ApiError } from '@/types/apiErrorType';

export const RESET_PASSWORD_STEP = {
  INPUT_EMAIL: 1,
  DISPLAY_TEMP_PASSWORD: 2,
};

export const emailSchema = zod.object({
  email: zod.string().email({ message: '이메일 형식이 아닙니다.' }),
});

export const useResetPassword = () => {
  const [step, setStep] = useState<number>(RESET_PASSWORD_STEP.INPUT_EMAIL);
  const [tempEmail, setTempEmail] = useState<string>('');

  const { showToast } = useToast();

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const {
    mutate: resetPasswordMutation,
    isPending,
    error,
  } = usePostResetPasswordMutation({
    onSuccess: (data: GetResetPasswordResponse) => {
      setStep(RESET_PASSWORD_STEP.DISPLAY_TEMP_PASSWORD);
      setTempEmail(data.temp_password);
      showToast(data.message);
    },
    onError: (error) => {
      console.error('Reset Password Error:', error);

      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }

      const apiError = error as ApiError;
      const errorMessage =
        apiError?.originalError.response?.data?.detail ||
        '비밀번호 재설정에 실패했습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handlePostResetPassword = () => {
    const { email } = form.getValues();
    resetPasswordMutation({ email });
  };

  return {
    form,
    step,
    tempEmail,
    RESET_PASSWORD_STEP,
    isPending,
    error,
    resetPasswordMutation: handlePostResetPassword,
  };
};
