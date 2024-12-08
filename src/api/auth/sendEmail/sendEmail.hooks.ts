import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  EmailVerificationCodeRequestParams,
  EmailVerificationRequestParams,
  GetEmailVerificationCodeResponse,
  GetEmailVerificationResponse,
} from './emailType';
import { emailAPI } from './sendEmailAPI';
import { ApiError } from '@/types/apiErrorType';

// 이메일 인증을 보내는 useMutation 훅
export const usePostEmailVerificationMutation = (
  options?: UseMutationOptions<
    GetEmailVerificationResponse, // 성공 시 반환 타입
    ApiError, // 에러 타입
    EmailVerificationRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: emailAPI.sendEmailVerification,
    ...options,
  });
};

// 이메일 인증 코드 검증을 위한 useMutation 훅
export const usePostEmailVerificationCodeMutation = (
  options?: UseMutationOptions<
    GetEmailVerificationCodeResponse, // 성공 시 반환 타입
    ApiError, // 에러 타입
    EmailVerificationCodeRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: emailAPI.postVerifyEmailCode,
    ...options,
  });
};
