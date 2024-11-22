import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MyPageResponseData } from '../../types/myPageType';
import { EditProfileRequestData } from '../../types/editProfile';

const editProfile = async (
  profileData: EditProfileRequestData
): Promise<MyPageResponseData> => {
  const response = await axios.patch<MyPageResponseData>(
    '/api/profile/me',
    profileData
  );
  return response.data;
};

export const useEditProfileMutation = (
  options?: UseMutationOptions<
    MyPageResponseData,
    Error,
    EditProfileRequestData
  >
) => {
  return useMutation({
    mutationFn: editProfile,
    ...options,
  });
};
