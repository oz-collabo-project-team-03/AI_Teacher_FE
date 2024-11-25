import { MyPageResponseData } from '@/types/myPageType';
import axios from 'axios';

type ProfileResponse = {
  success: boolean;
  message: string;
  data: MyPageResponseData;
};

export const fetchProfileAPI = async () => {
  const { data } = await axios.get<ProfileResponse>('/api/profile/me');

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
};

export const fetchUserProfileAPI = async (userId: string) => {
  const { data } = await axios.get<ProfileResponse>(`/api/profile/${userId}`);

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
};
