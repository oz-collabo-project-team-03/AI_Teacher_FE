import { CommentListResponseDto } from './fetchCommentType';
import axiosInstance from '../../axiosInstance';

export const getFetchCommentAPI = async (
  post_id: number
): Promise<CommentListResponseDto> => {
  const response = await axiosInstance.get<CommentListResponseDto>(
    `/comments/${post_id}`
  );

  return response.data;
};
