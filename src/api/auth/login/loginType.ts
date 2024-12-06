export type LoginRequestParams = {
  email: string;
  password: string;
};

export type GetLoginResponse = {
  id: number;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expired_in: number;
  role: string;
  first_login: boolean;
  message: string;
};
