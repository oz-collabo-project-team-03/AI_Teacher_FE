import axiosInstance from '../axiosInstance';
import {
  EditProfileRequestParams,
  EditProfileResponseDto,
} from '@/types/editProfileType';

export const getEditProfileAPI = async (
  profileData: EditProfileRequestParams
): Promise<EditProfileResponseDto> => {
  // role에 따라 엔드포인트 결정
  const endpoint =
    profileData.role === 'student'
      ? '/users/profile/student'
      : '/users/profile/teacher';

  // role을 제외한 데이터 준비
  const { role, ...profileUpdateData } = profileData;

  const response = await axiosInstance.patch<EditProfileResponseDto>(
    endpoint,
    profileUpdateData
  );

  return response.data;
};
