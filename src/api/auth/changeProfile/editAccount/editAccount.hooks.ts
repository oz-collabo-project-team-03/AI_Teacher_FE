import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  EditAccountRequestParams,
  EditAccountResponseDto,
} from './editAccountType';
import { editAccountAPI } from './editAccountAPI';

export const useEditAccountMutation = (
  options?: UseMutationOptions<
    EditAccountResponseDto,
    Error,
    EditAccountRequestParams
  >
) => {
  return useMutation({
    mutationFn: editAccountAPI,
    ...options,
    throwOnError: true,
  });
};
