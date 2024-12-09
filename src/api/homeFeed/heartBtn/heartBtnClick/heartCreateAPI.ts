import {
  HeartCreateRequestParams,
  HeartCreateResponseDto,
} from './heartCreateType';

import axiosInstance from '@/api/axiosInstance';

export const HeartCreateAPI = async (
  requestData: HeartCreateRequestParams
): Promise<HeartCreateResponseDto> => {
  const { post_id, like } = requestData;
  const response = await axiosInstance.post(`/posts/${post_id}/like`, { like });

  return response.data;
};
