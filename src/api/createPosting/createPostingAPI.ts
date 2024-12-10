import {
  CreatePostingRequestParams,
  CreatePostingResponseDto,
} from '../../types/createPostingType';

import axiosInstance from '@/api/axiosInstance';

export const CreatePostingAPI = async (
  createPostingData: CreatePostingRequestParams
): Promise<CreatePostingResponseDto> => {


  const formData = new FormData();
  formData.append('image1', createPostingData.image1);
  if (createPostingData.image2)
    formData.append('image2', createPostingData.image2);
  if (createPostingData.image3)
    formData.append('image3', createPostingData.image3);

  formData.append('content', createPostingData.content);
  formData.append(
    'is_with_teacher',
    createPostingData.is_with_teacher.toString()
  );
  const response = await axiosInstance.post<CreatePostingResponseDto>(
    '/posts/write',
    formData
  );

  return response.data;
};
