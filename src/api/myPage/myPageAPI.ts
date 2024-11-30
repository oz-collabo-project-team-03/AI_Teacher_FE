import axiosInstance from '../axiosInstance';
import { MyPageResponseDto } from '@/types/myPageType';

export const getMyProfileAPI = async () => {
  const response =
    await axiosInstance.get<MyPageResponseDto>('/users/profile/me');

  return response.data;
};

export const getUserProfileAPI = async (userId: string) => {
  const response = await axiosInstance.get<MyPageResponseDto>(
    `/users/profile/${userId}`
  );

  return response.data;
};
