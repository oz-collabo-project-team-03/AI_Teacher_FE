import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { patchEditProfileAPI } from './editProfileAPI';
import {
  EditProfileRequestParams,
  EditProfileResponseDto,
} from '@/types/editProfileType';

export const useEditProfileMutation = (
  options?: UseMutationOptions<
    EditProfileResponseDto,
    Error,
    EditProfileRequestParams
  >
) => {
  return useMutation({
    mutationFn: patchEditProfileAPI,
    ...options,
  });
};
