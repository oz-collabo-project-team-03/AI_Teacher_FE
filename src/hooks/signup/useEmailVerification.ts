import {
  usePostEmailVerificationCodeMutation,
  usePostEmailVerificationMutation,
} from '@/api/auth/sendEmail/sendEmail.hooks';

import { ApiErrorResponseDto } from '@/types/apiErrorType';
import axios from 'axios';
import { signupFormSchema } from '@/schemas/signupValidationSchemas';
import useCountdown from '@/hooks/signup/useCountDown';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';

type FormValues = {
  email: string;
  code: string;
};

export const useEmailVerification = (getValues: () => FormValues) => {
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const { showToast } = useToast();
  const { start, formatTime, reset } = useCountdown(180);

  const {
    mutate: emailCodeMutation,
    isPending,
    error,
  } = usePostEmailVerificationMutation({
    onSuccess: () => {
   
    },
    onError: (error) => {
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
       
      }

      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '인증코드 전송에 실패했습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      code: '',
    },
    mode: 'onSubmit',
  });

  const { mutate: emailVerificationMutation } =
    usePostEmailVerificationCodeMutation({
      onSuccess: () => {
        showToast('이메일 인증이 완료되었습니다.');
        reset();
      },
      onError: (error) => {
        // Axios 에러인 경우 더 상세한 로깅
        if (axios.isAxiosError(error)) {
         
        }

        const apiError = error as ApiErrorResponseDto;
        const errorMessage =
          apiError?.response?.data?.message ||
          '인증에 실패하였습니다. 다시 시도해주세요.';
        showToast(errorMessage);
      },
    });

  const handlePostSendCode = () => {
    const emailData = getValues().email;
    if (!emailData) {
      showToast('이메일을 입력해주세요');
      return;
    }
    emailCodeMutation({ email: emailData });
    setShowVerificationInput(true);
    start();
  };

  const handlePostVerificationCode = () => {
    const emailData = getValues().email;
    const code = getValues().code;
    if (!code) {
      showToast('인증번호를 입력해주세요');
      return;
    }
    emailVerificationMutation({ email: emailData, code: code });
  };

  return {
    showVerificationInput,
    formatTime,
    isPending,
    error,
    form,
    emailCodeMutation: handlePostSendCode,
    emailVerificationMutation: handlePostVerificationCode,
  };
};
