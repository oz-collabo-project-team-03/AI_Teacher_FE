import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MyPageResponseData } from '@/types/myPageType';
import { EditProfileRequestData } from '@/types/editProfileType';
import { editProfileAPI } from './editProfileAPI';

export const useEditProfileMutation = (
  options?: UseMutationOptions<
    MyPageResponseData,
    AxiosError,
    EditProfileRequestData
  >
) => {
  return useMutation({
    mutationFn: editProfileAPI,
    ...options,
  });
};
