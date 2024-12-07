import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { socialLoginAPI } from './socialAPI';
import {
  GetSocialLoginResponse,
  SocialStudentInfoRequestParams,
  SocialTeacherInfoRequestParams,
} from './socialType';

/**소셜로그인 콜백요청 */
export const useSocialLoginCallbackMutation = (
  options?: UseMutationOptions<
    GetSocialLoginResponse, // 성공 시 반환 타입
    Error, // 에러 타입
    { provider: string; code: string } // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: socialLoginAPI.postSocialLoginCallBack,
    ...options,
  });
};

/**소셜로그인 후 정보입력 학생 */
export const usePatchSocialStudentInfoMutation = (
  options?: UseMutationOptions<
    GetSocialLoginResponse, // 성공 시 반환 타입
    Error, // 에러 타입
    SocialStudentInfoRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: socialLoginAPI.patchSocialStudentInfo,
    ...options,
  });
};

/** 소셜로그인 후 정보입력 선생 */
export const usePatchSocialTeacherInfoMutation = (
  options?: UseMutationOptions<
    GetSocialLoginResponse, // 성공 시 반환 타입
    Error, // 에러 타입
    SocialTeacherInfoRequestParams // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: socialLoginAPI.patchSocialTeacherInfo,
    ...options,
  });
};
