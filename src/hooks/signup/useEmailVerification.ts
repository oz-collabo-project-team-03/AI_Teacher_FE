import {
  useEmailVerificationCodeMutation,
  useEmailVerificationMutation,
} from '@/api/auth/sendEmail/sendEmail.hooks';
import useCountdown from '@/hooks/signup/useCountDown';
import { useToast } from '@/hooks/useToast';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import axios from 'axios';
import { useState } from 'react';

type FormValues = {
  email: string;
  code: string;
};

export const useEmailVerification = (getValues: () => FormValues) => {
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const { showToast } = useToast();
  const { start, formatTime, reset } = useCountdown(180);

  const { mutate: EmailCodeMutation } = useEmailVerificationMutation({
    onSuccess: (data) => {
      console.log('Email verification sent successfully:', data);
    },
    onError: (error) => {
      console.error('Error sending email verification:', error);
    },
  });

  const { mutate: EmailVerificationMutation } =
    useEmailVerificationCodeMutation({
      onSuccess: () => {
        showToast('이메일 인증이 완료되었습니다.');
        reset();
      },
      onError: (error) => {
        console.error('Login Error:', error); // 에러 상세 로깅

        // Axios 에러인 경우 더 상세한 로깅
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
          '인증에 실패하였습니다. 다시 시도해주세요.';
        showToast(errorMessage);
      },
    });

  const handleSendCode = () => {
    const emailData = getValues().email;
    if (!emailData) {
      showToast('이메일을 입력해주세요');
      return;
    }
    EmailCodeMutation({ email: emailData });
    setShowVerificationInput(true);
    start();
  };

  const handleVerificationCode = () => {
    const emailData = getValues().email;
    const code = getValues().code;
    if (!code) {
      showToast('인증번호를 입력해주세요');
      return;
    }
    EmailVerificationMutation({ email: emailData, code: code });
  };

  return {
    showVerificationInput,
    formatTime,
    handleSendCode,
    handleVerificationCode,
  };
};
