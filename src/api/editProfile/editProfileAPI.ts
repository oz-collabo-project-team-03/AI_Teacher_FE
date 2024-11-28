import { EditProfileRequestData } from '@/types/editProfileType';
import { MyPageResponseData } from '@/types/myPageType';
import axiosInstance from '../axiosInstance';

export const editProfileAPI = async (
  profileData: EditProfileRequestData
): Promise<MyPageResponseData> => {
  const response = await axiosInstance.patch<MyPageResponseData>(
    '/users/profile/me',
    profileData
  );

  return response.data;
};
