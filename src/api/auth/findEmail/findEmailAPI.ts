import axios from 'axios';
import { FindEmailParams, FindEmailResponseDto } from './findEmailType';

export const findEmailAPI = async (
  findEmailData: FindEmailParams
): Promise<FindEmailResponseDto> => {
  const response = await axios.post<FindEmailResponseDto>(
    '/auth/find/email',
    findEmailData
  );
  return response.data;
};
