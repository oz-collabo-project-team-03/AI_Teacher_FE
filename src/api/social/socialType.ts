import { Role } from '@/types/signupType';

export type SocialLoginCallBackRequestParams = {
  provider: string;
  code: string;
};

// 소셜로그인 콜백 요청만 보낼때
export type GetSocialLoginResponse = {
  id: number;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  first_login: boolean;
  social: boolean;
  study_group: boolean;
  role: Role;
  message: string;
};

type BaseSocialInfoRequestParams = {
  role: Role;
  nickname: string;
  is_privacy_accepted: boolean;
};

// 최초 소셜로그인 일때 보내는 타입들
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

/** 소셜로그인 최초 가입시 반환타입*/
export type GetSocialLoginUserInfoResponse = {
  message: string;
  role: Role;
  first_login: boolean;
  study_group: boolean;
};
