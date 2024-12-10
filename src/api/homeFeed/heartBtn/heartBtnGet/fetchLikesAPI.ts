import { FetchLikeResponseDto } from './fetchLikesType';
import axiosInstance from '../../../axiosInstance';

export const fetchLikeStatus = async (
  post_id: string
): Promise<FetchLikeResponseDto> => {
  try {
    const response = await axiosInstance.get<FetchLikeResponseDto>(
      `/posts/${post_id}/like`
    );
    return response.data;
  } catch (error: any) {

    throw error;
  }
};
