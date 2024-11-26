import { PostDetailResponse } from '@/types/postDetail';
import axios from 'axios';

type PostsApiResponse = {
  success: boolean;
  message: string;
  data: PostDetailResponse;
};

export const getMyPostsAPI = async (page: number = 1) => {
  const { data } = await axios.get<PostsApiResponse>('/api/posts/me', {
    params: { page },
  });

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
};

export const getUserPostsAPI = async (userId: string, page: number = 1) => {
  const { data } = await axios.get<PostsApiResponse>(`/api/posts/${userId}`, {
    params: { page },
  });

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
};
