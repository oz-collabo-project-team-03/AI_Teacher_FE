import { MyPageResponseData } from '@/types/myPageType';
import axiosInstance from '../axiosInstance';

export const getMyProfileAPI = async () => {
  const response =
    await axiosInstance.get<MyPageResponseData>('/users/profile/me');

  return response.data;
};

export const getUserProfileAPI = async (userId: string) => {
  const response = await axiosInstance.get<MyPageResponseData>(
    `/users/profile/${userId}`
  );

  return response.data;
};
