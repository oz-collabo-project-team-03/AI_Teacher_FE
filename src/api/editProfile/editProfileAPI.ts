import axiosInstance from '../axiosInstance';
import {
  EditProfileRequestParams,
  EditProfileResponseDto,
} from '@/types/editProfileType';

export const getEditProfileAPI = async (
  profileData: EditProfileRequestParams
): Promise<EditProfileResponseDto> => {
  const response = await axiosInstance.patch<EditProfileResponseDto>(
    '/users/profile/me',
    profileData
  );

  return response.data;
};
