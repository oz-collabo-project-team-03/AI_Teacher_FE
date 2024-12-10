import {
  EmailVerificationCodeRequestParams,
  EmailVerificationRequestParams,
  GetEmailVerificationCodeResponse,
  GetEmailVerificationResponse,
} from './emailType';

import axiosInstance from '@/api/axiosInstance';

export const emailAPI = {
  // 이메일 인증 요청 함수
  sendEmailVerification: async (
    emailData: EmailVerificationRequestParams
  ): Promise<GetEmailVerificationResponse> => {
    const response = await axiosInstance.post<GetEmailVerificationResponse>(
      '/auth/email/send',
      emailData
    );
    return response.data;
  },

  // 이메일 인증 코드 확인 함수
  postVerifyEmailCode: async (
    verificationData: EmailVerificationCodeRequestParams
  ): Promise<GetEmailVerificationCodeResponse> => {
    const response = await axiosInstance.post(
      '/auth/email/verify',
      verificationData
    );
    return response.data;
  },
};
