export type ResetPasswordParams = {
  email: string;
};

export type ResetPasswordResponseDto = {
  message: string;
  email: string;
  new_password: string;
};
