import axiosInstance from '../axiosInstance';
import { PostListResponseDto } from '@/types/postType';

export const getAllPostsAPI = async (
  pageParam: number
): Promise<PostListResponseDto> => {
  const response = await axiosInstance.get<PostListResponseDto>('/posts', {
    params: { page: pageParam },
  });

  return response.data;
};
