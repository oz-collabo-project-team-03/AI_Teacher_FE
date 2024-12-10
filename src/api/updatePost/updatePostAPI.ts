import axiosInstance from '../axiosInstance';
import { UpdatePostingRequestParams } from './updatePost.type';

export const updatePostAPI = async (
  post_id: string,
  updatePostData: UpdatePostingRequestParams
) => {
  console.log('updatePostData:', updatePostData);
  console.log('post_id:', post_id);

  const formData = new FormData();

  // 이미지 파일 존재 여부 확인
  if (updatePostData.image1) {
    formData.append('image1', updatePostData.image1);
  }
  if (updatePostData.image2) {
    formData.append('image2', updatePostData.image2);
  }
  if (updatePostData.image3) {
    formData.append('image3', updatePostData.image3);
  }

  formData.append(
    'is_with_teacher',
    updatePostData.is_with_teacher !== undefined
      ? updatePostData.is_with_teacher.toString()
      : 'false'
  );
  formData.append('content', updatePostData.content);

  const response = await axiosInstance.put(`/posts/${post_id}`, formData);

  return response.data;
};
