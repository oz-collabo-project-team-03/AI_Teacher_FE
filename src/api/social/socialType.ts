import { Role } from '@/types/signupType';

export type SocialLoginCallBackRequestParams = {
  provider: string;
  code: string;
};

export type GetSocialLoginResponse = {
  id: number;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  first_login: boolean;
  social: boolean;
  role: string;
  message: string;
};

export type SocialLoginUserInfoRequestParams = {
  role: Role;
  nickname: string;
  is_privacy_accepted: boolean;
  school: string;
  grade: number;
  career_aspiration: string;
  interests: string;
};

export type GetSocialLoginUserInfoResponse = {
  message: string;
};
