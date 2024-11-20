import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoginRequsetData, LoginResponseData } from '../../types/loginType';

const login = async (
  userData: LoginRequsetData
): Promise<LoginResponseData> => {
  const response = await axios.post<LoginResponseData>('/api/login', userData);
  return response.data;
};

export const useLoginMutation = (
  options?: UseMutationOptions<
    LoginResponseData, // 성공 시 반환 타입
    Error, // 에러 타입
    LoginRequsetData // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};
