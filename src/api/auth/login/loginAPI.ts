import axios from 'axios';
import { LoginRequestParams, LoginResponseDto } from './loginType';

export const loginAPI = async (
  userData: LoginRequestParams
): Promise<LoginResponseDto> => {
  const response = await axios.post<LoginResponseDto>('/auth/login', userData);
  return response.data;
};
