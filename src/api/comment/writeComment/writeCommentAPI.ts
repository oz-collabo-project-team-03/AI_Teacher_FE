import {
  FetchCommentRequestParams,
  FetchCommentResponseDto,
} from './writeCommentType';

import axiosInstance from '@/api/axiosInstance';

export const FetchCommentAPI = async ({
  post_id,
  FetchCommentData,
}: {
  post_id: string;
  FetchCommentData: FetchCommentRequestParams;
}): Promise<FetchCommentResponseDto> => {

  const response = await axiosInstance.post<FetchCommentResponseDto>(
    `/comments/write/${post_id}`,
    FetchCommentData
  );
  return response.data;
};
