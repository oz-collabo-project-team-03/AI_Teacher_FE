export type ResetPasswordParams = {
  email: string;
};

export type GetResetPasswordResponse = {
  message: string;
  email: string;
  temp_password: string;
};
