import { MyPageResponseData } from '@/types/myPageType';
import axios from 'axios';

type ProfileResponse = {
  success: boolean;
  message: string;
  data: MyPageResponseData;
};

export const fetchProfileAPI = async (): Promise<MyPageResponseData> => {
  const { data } = await axios.get<ProfileResponse>('/api/profile/me');

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
};
