import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { socialLoginAPI } from './socialAPI';
import {
    GetSocialLoginResponse,
    GetSocialLoginUserInfoResponse,
    SocialLoginUserInfoRequestParams,
} from './socialType';

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

export const usePatchSocialStudentInfoMutation = (
    options?: UseMutationOptions<
        GetSocialLoginUserInfoResponse, // 성공 시 반환 타입
        Error, // 에러 타입
        SocialLoginUserInfoRequestParams // 요청 데이터 타입
    >
) => {
    return useMutation({
        mutationFn: socialLoginAPI.patchSocialStudentInfo,
        ...options,
    });
};
