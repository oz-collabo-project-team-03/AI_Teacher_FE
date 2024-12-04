import {
  DeleteCommentParams,
  DeleteCommentResponseDto,
} from './deleteCommentType';

import axiosInstance from '@/api/axiosInstance';

export const deleteCommentAPI = async (
  params: DeleteCommentParams
): Promise<DeleteCommentResponseDto> => {
  const { comment_id } = params;
  const response = await axiosInstance.delete<DeleteCommentResponseDto>(
    `/comments/${comment_id}`
  );

  return response.data;
};
