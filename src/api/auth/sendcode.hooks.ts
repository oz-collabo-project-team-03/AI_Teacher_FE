import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  EmailVerificationCodeRequestData,
  EmailVerificationCodeResponseData,
  EmailVerificationRequestData,
  EmailVerificationResponseData,
} from '../../types/emailType';

// 이메일 인증 요청 함수
const sendEmailVerification = async (
  emailData: EmailVerificationRequestData
): Promise<EmailVerificationResponseData> => {
  console.log('요청 데이터:', emailData);
  const response = await axios.post<EmailVerificationResponseData>(
    '/api/email/send-verification',
    emailData
  );
  return response.data;
};

// 이메일 인증을 보내는 useMutation 훅
export const useEmailVerificationMutation = (
  options?: UseMutationOptions<
    EmailVerificationResponseData, // 성공 시 반환 타입
    Error, // 에러 타입
    EmailVerificationRequestData // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: sendEmailVerification,
    ...options,
  });
};

// 이메일 인증 코드 확인 함수
const verifyEmailCode = async (
  verificationData: EmailVerificationCodeRequestData
): Promise<EmailVerificationCodeResponseData> => {
  const response = await axios.post('/api/email/verify-code', verificationData);
  return response.data;
};

// 이메일 인증 코드 검증을 위한 useMutation 훅
export const useEmailVerificationCodeMutation = (
  options?: UseMutationOptions<
    EmailVerificationCodeResponseData, // 성공 시 반환 타입
    Error, // 에러 타입
    EmailVerificationCodeRequestData // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: verifyEmailCode,
    ...options,
  });
};
