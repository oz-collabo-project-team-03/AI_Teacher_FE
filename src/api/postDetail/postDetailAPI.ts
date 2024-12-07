import axiosInstance from '../axiosInstance';
import { PostListResponseDto } from '@/types/postType';

export const getMyPostsAPI = async (pageParam: number) => {
  const response = await axiosInstance.get<PostListResponseDto>('/posts/me', {
    params: { page: pageParam },
  });

  return response.data;
};

export const getUserPostsAPI = async (userId: number, pageParam: number) => {
  const response = await axiosInstance.get<PostListResponseDto>(
    `/posts/users/${userId}`,
    {
      params: { page: pageParam },
    }
  );

  return response.data;
};
