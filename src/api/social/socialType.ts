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

type BaseSocialInfoRequestParams = {
  role: Role;
  nickname: string;
  is_privacy_accepted: boolean;
};

//학생 전용 필드
export type SocialStudentInfoRequestParams = BaseSocialInfoRequestParams & {
  school: string;
  grade: number;
  career_aspiration: string;
  interests: string;
};

// 선생님 전용필드
export type SocialTeacherInfoRequestParams = BaseSocialInfoRequestParams & {
  organization_name: string;
  organization_type: string;
  position: string;
};

// 소셜로그인 가입 요청타입 (선생님 또는 학생)
export type SocialUserInfoRequestParams =
  | SocialStudentInfoRequestParams
  | SocialTeacherInfoRequestParams;

// export type GetSocialLoginUserInfoResponse = {
//   message: string;
// };
