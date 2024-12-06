import axiosInstance from '../axiosInstance';
import {
  EditProfileRequestParams,
  EditProfileResponseDto,
} from '@/types/editProfileType';

export const patchEditProfileAPI = async (
  profileData: EditProfileRequestParams
): Promise<EditProfileResponseDto> => {
  const endpoint =
    profileData.role === 'student'
      ? '/users/profile/student'
      : '/users/profile/teacher';

  // role,profile_image은 제외
  const { role, profile_image, ...rest } = profileData;

  // 빈 문자열이 아닌 값만 필터링
  const filteredData = Object.fromEntries(
    Object.entries(rest).filter(([_, value]) => value !== '')
  );

  // 파일명만 추출
  const profileUpdateData = {
    ...filteredData,
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
