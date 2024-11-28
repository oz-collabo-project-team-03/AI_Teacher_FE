export type ResetPasswordParams = {
  email: string;
};

export type ResetPasswordResponseDto = {
  message: string;
  email: string;
  temp_password: string;
};
