import { usePostFindEmailMutation } from '@/api/auth/findEmail/findEmail.hooks';
import { GetFindEmailResponse } from '@/api/auth/findEmail/findEmailType';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { useToast } from '../useToast';

export const FIND_EMAIL_STEP = {
  INPUT_PHONE: 1, // 전화번호 입력
  DISPLAY_EMAIL: 2, // 이메일 결과 표시
};

export const phoneSchema = zod.object({
  phone: zod
    .string()
    .regex(/^0\d{9,10}$/, '전화번호 형식이 유효하지 않습니다.'),
});

export const useFindEmail = () => {
  const [step, setStep] = useState(FIND_EMAIL_STEP.INPUT_PHONE);
  const [findEmail, setFindEmail] = useState('');

  const { showToast } = useToast();

  const form = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
    mode: 'onChange',
  });

  const {
    mutate: findEmailMutation,
    isPending,
    error,
  } = usePostFindEmailMutation({
    onSuccess: (data: GetFindEmailResponse) => {
      setFindEmail(data.email);
      setStep(FIND_EMAIL_STEP.DISPLAY_EMAIL);
    },
    onError: (error) => {
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
        '이메일찾기에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handlePostFindEmail = async () => {
    const { phone } = form.getValues();
    findEmailMutation({ phone });
  };

  return {
    form,
    step,
    findEmail,
    FIND_EMAIL_STEP,
    findEmailMutation: handlePostFindEmail,
    isPending,
    error,
  };
};
