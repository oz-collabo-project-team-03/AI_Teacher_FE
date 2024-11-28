export type LoginRequestParams = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expired_in: number;
  role: string;
  message: string;
};
