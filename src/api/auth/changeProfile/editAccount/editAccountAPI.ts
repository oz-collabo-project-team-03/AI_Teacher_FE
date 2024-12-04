import axiosInstance from '@/api/axiosInstance';
import {
  EditAccountRequestParams,
  EditAccountResponseDto,
} from './editAccountType';

export const editAccountAPI = async (
  userData: EditAccountRequestParams
): Promise<EditAccountResponseDto> => {
  const response = await axiosInstance.patch<EditAccountResponseDto>(
    '/auth/update/info',
    userData
  );
  return response.data;
};
