import { ApiErrorResponseDto } from '@/types/apiErrorType';
import axios from 'axios';
import { useDeletePostMutation } from '@/api/deletePost/deletePost.hooks';
import { useToast } from '../useToast';

export const useDeletePost = () => {
  const { showToast } = useToast();

  const {
    mutate: deletePostMutation,
    isPending,
    error,
  } = useDeletePostMutation({
    onSuccess: () => {
      showToast('게시글이 삭제되었습니다');
    },
    onError: (error) => {
      // Axios 에러인 경우 더 상세한 로깅
      if (axios.isAxiosError(error)) {
      
      }
      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '게시물 삭제에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handleDeletePost = async (post_id: string) => {
    deletePostMutation({ post_id });
  };

  return {
    deletePostMutation: handleDeletePost,
    isPending,
    error,
  };
};
