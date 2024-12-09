import axiosInstance from '../axiosInstance';
import { DeletePostParams, GetDeletePostResponse } from './deletePostType';

export const deletePostAPI = async (
  params: DeletePostParams
): Promise<GetDeletePostResponse> => {
  const response = await axiosInstance.delete<GetDeletePostResponse>(
    `/posts/${params.post_id}`
  );
  return response.data;
};
