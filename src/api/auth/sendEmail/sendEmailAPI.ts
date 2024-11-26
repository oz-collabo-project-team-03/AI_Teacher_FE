import axios from 'axios';
import {
  EmailVerificationCodeRequestParams,
  EmailVerificationCodeResponseDto,
  EmailVerificationRequestParams,
  EmailVerificationResponseDto,
} from './emailType';

// 이메일 인증 요청 함수
export const sendEmailVerificationAPI = async (
  emailData: EmailVerificationRequestParams
): Promise<EmailVerificationResponseDto> => {
  console.log('요청 데이터:', emailData);
  const response = await axios.post<EmailVerificationResponseDto>(
    '/api/email/send',
    emailData
  );
  return response.data;
};

// 이메일 인증 코드 확인 함수
export const verifyEmailCodeAPI = async (
  verificationData: EmailVerificationCodeRequestParams
): Promise<EmailVerificationCodeResponseDto> => {
  const response = await axios.post('/api/email/verify', verificationData);
  return response.data;
};
