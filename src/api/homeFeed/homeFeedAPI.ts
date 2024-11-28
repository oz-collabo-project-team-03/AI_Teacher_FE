import { PostListResponse } from '@/types/postType';
import axiosInstance from '../axiosInstance';

export const getAllPostsAPI = async (pageParam: number) => {
  const response = await axiosInstance.get<PostListResponse>('/posts', {
    params: { page: pageParam },
  });

  return response.data;
};
