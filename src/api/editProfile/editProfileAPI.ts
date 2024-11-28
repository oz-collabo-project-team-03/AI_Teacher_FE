import { EditProfileRequestData } from '@/types/editProfileType';
import { MyPageResponseData } from '@/types/myPageType';
import axios from 'axios';

type EditProfileResponse = {
  success: boolean;
  message: string;
  data: MyPageResponseData;
};

export const editProfileAPI = async (
  profileData: EditProfileRequestData
): Promise<MyPageResponseData> => {
  const { data } = await axios.patch<EditProfileResponse>(
    '/api/profile/me',
    profileData
  );

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
};
