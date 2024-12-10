import { useUpdatePostingMutation } from '@/api/updatePost/updatePost.hooks';
import { useToast } from '../useToast';
import axios from 'axios';
import { ApiErrorResponseDto } from '@/types/apiErrorType';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdatePostingRequestParams } from '@/api/updatePost/updatePost.type';

export const useUpdatePost = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const {
    mutate: updatePostMutation,
    isPending,
    error,
  } = useUpdatePostingMutation({
    onSuccess: (data) => {
      console.log('게시글 수정 완료', data);
      navigate('/student-main');
      showToast('게시글이 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('Full Error Object:', error);
      console.log(error.message);
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }

      const apiError = error as ApiErrorResponseDto;
      const errorMessage =
        apiError?.response?.data?.message ||
        '게시글 수정에 실패하였습니다. 다시 시도해주세요.';
      showToast(errorMessage);
    },
  });

  const handleUpdatePost = (formData: UpdatePostingRequestParams) => {
    updatePostMutation({
      postId: postId!,
      postData: formData,
    });
  };

  return {
    updatePostMutation: handleUpdatePost,
    isPending,
    error,
  };
};
