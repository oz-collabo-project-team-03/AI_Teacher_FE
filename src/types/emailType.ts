export type EmailVerificationRequestData = {
  email: string; // 이메일 주소
};
export type EmailVerificationResponseData = {
  success: boolean; // 인증 성공 여부
  message: string; // 응답 메시지 (예: "인증 이메일을 보냈습니다.")
};

export type EmailVerificationCodeRequestData = {
  email: string;
  code: string;
};

export type EmailVerificationCodeResponseData = {
  email: string;
  code: string;
};
