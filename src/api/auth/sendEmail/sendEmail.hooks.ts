import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  EmailVerificationCodeRequestParams,
  EmailVerificationCodeResponseDto,
  EmailVerificationRequestParams,
  EmailVerificationResponseDto,
} from './emailType';
import { sendEmailVerificationAPI, verifyEmailCodeAPI } from './sendEmailAPI';

// 이메일 인증을 보내는 useMutation 훅
export const useEmailVerificationMutation = (
  options?: UseMutationOptions<
    EmailVerificationResponseDto, // 성공 시 반환 타입
    Error, // 에러 타입
    EmailVerificationRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: sendEmailVerificationAPI,
    ...options,
    throwOnError: true,
  });
};

// 이메일 인증 코드 검증을 위한 useMutation 훅
export const useEmailVerificationCodeMutation = (
  options?: UseMutationOptions<
    EmailVerificationCodeResponseDto, // 성공 시 반환 타입
    Error, // 에러 타입
    EmailVerificationCodeRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: verifyEmailCodeAPI,
    ...options,
    throwOnError: true,
  });
};
