import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SignupRequestData, SignupResponseData } from '../../types/signupType';

const signup = async (
  userData: SignupRequestData
): Promise<SignupResponseData> => {
  const response = await axios.post<SignupResponseData>(
    '/api/signup',
    userData
  );
  return response.data;
};

export const useSignupMutation = (
  options?: UseMutationOptions<
    SignupResponseData, // 성공 시 반환 타입
    Error, // 에러 타입
    SignupRequestData // 요청 데이터 타입
  >
) => {
  return useMutation({
    mutationFn: signup,
    ...options,
  });
};
