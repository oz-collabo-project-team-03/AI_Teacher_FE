import axiosInstance from '@/api/axiosInstance';
import axios from 'axios';
import {
  GetSocialLoginUserInfoResponse,
  SocialLoginUserInfoRequestParams,
} from './socialType';
const { VITE_BASE_REQUEST_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_BASE_REQUEST_URL,
  withCredentials: true,
});

export const socialLoginAPI = {
  getRedirectToSocialLogin: async (provider: string) => {
    const response = await axiosInstance.get(`/auth/login/${provider}`);
    return response.data;
  },

  postSocialLoginCallBack: async (params: {
    provider: string;
    code: string;
  }) => {
    const { provider, code } = params;
    const response = await axiosInstance.post(
      `/auth/login/callback/${provider}`,
      {
        code,
      }
    );
    return response.data;
  },
  // 소셜로그인 학생 추가정보입력
  patchSocialStudentInfo: async (
    socialStudentInfoData: SocialLoginUserInfoRequestParams
  ): Promise<GetSocialLoginUserInfoResponse> => {
    const response = await axiosInstance.patch(
      '/auth/social/info/student',
      socialStudentInfoData
    );
    return response.data;
  },
  // 소셜로그인 선생님 추가정보입력
  patchSocialTeacherInfo: async (
    socialTeacherInfoData: SocialLoginUserInfoRequestParams
  ): Promise<GetSocialLoginUserInfoResponse> => {
    const response = await axiosInstance.patch(
      '/auth/social/info/teacher',
      socialTeacherInfoData
    );
    return response.data;
  },
};
