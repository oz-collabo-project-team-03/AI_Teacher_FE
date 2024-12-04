export type EditAccountRequestParams = {
  role: 'student' | 'teacher' | undefined;
  password: string;
  password_confirm: string;
  phone: string;
  school?: string;
  grade?: number;
};

export type EditAccountResponseDto = {
  message: string;
};
