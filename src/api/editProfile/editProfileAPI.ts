import axiosInstance from '../axiosInstance';
import {
  EditProfileRequestParams,
  EditProfileResponseDto,
} from '@/types/editProfileType';

export const getEditProfileAPI = async (
  profileData: EditProfileRequestParams
): Promise<EditProfileResponseDto> => {
  const endpoint =
    profileData.role === 'student'
      ? '/users/profile/student'
      : '/users/profile/teacher';

  // role은 제외, profile_image 파일명만 추출
  const { role, profile_image, ...rest } = profileData;

  const profileUpdateData = {
    ...rest,
    profile_image: profile_image
      ? profile_image.split('/').pop()?.split('.')[0]
      : profile_image,
  };

  const response = await axiosInstance.patch<EditProfileResponseDto>(
    endpoint,
    profileUpdateData
  );

  return response.data;
};
