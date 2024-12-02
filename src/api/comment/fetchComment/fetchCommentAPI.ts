import {
  FetchCommentRequestParams,
  FetchCommentResponseDto,
} from './fetchCommentType';

import axiosInstance from '@/api/axiosInstance';

export const FetchCommentAPI = async ({
  post_id,
  FetchCommentData,
}: {
  post_id: number;
  FetchCommentData: FetchCommentRequestParams;
}): Promise<FetchCommentResponseDto> => {
  console.log('요청 데이터:', FetchCommentData);
  const response = await axiosInstance.post<FetchCommentResponseDto>(
    `/comments/write/${post_id}`,
    FetchCommentData
  );
  return response.data;
};
