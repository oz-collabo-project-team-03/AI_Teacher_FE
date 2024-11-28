import { PostListResponse } from '@/types/postType';
import axiosInstance from '../axiosInstance';

export const getMyPostsAPI = async (pageParam: number) => {
  const response = await axiosInstance.get<PostListResponse>('/posts/me', {
    params: { page: pageParam },
  });

  return response.data;
};

export const getUserPostsAPI = async (userId: string, pageParam: number) => {
  const response = await axiosInstance.get<PostListResponse>(
    `/posts/users/${userId}`,
    {
      params: { page: pageParam },
    }
  );

  return response.data;
};
