import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { verifyPasswordAPI } from './verifyPasswordAPI';
import {
  VerifyPasswordRequestParams,
  VerifyPasswordResponseDto,
} from './verifyPasswordType';

export const useVerifyPasswordMutation = (
  options?: UseMutationOptions<
    VerifyPasswordResponseDto,
    Error,
    VerifyPasswordRequestParams
  >
) => {
  return useMutation({
    mutationFn: verifyPasswordAPI,
    ...options,
  });
};
