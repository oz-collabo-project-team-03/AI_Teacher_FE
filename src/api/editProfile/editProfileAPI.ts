import axiosInstance from '../axiosInstance';
import {
  EditProfileRequestParams,
  EditProfileResponseDto,
} from '@/types/editProfileType';

export const patchEditProfileAPI = async (
  profileData: EditProfileRequestParams
): Promise<EditProfileResponseDto> => {
  const response = await axiosInstance.patch<EditProfileResponseDto>(
    `/users/profile/${profileData.role}`,
    formatProfileData(profileData)
  );

  return response.data;
};

const formatProfileData = (profileData: EditProfileRequestParams) => {
  const excludeFields = [
    'role',
    'comment_count',
    'grade',
    'id',
    'like_count',
    'post_count',
    'posts',
    'school',
  ];

  const filteredData = Object.fromEntries(
    Object.entries(profileData).filter(
      ([key, value]) => value !== '' && !excludeFields.includes(key)
    )
  );

  return {
    ...filteredData,
    profile_image: profileData.profile_image
      ? profileData.profile_image.split('/').pop()?.split('.')[0]
      : profileData.profile_image,
  };
};
