import { Controller, FormProvider, useForm } from 'react-hook-form';

import Button from '../../components/common/Button';
import { CreatePostingAPI } from '@/api/createPosting/createPostingAPI';
import Header from '../../components/common/Header';
import PostImageUpload from '../../components/posting/PostImageUpload';
import PostTextEditor from '../../components/posting/PostTextEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdatePost } from '@/hooks/updatePost/useUpdatePost';
import { CreatePostingRequestParams } from '@/types/createPostingType';

type FormValues = {
  images: File[];
  content: string;
  is_with_teacher: boolean;
};

const CreatePostPage = () => {
  const queryClient = useQueryClient();
  const { updatePostMutation } = useUpdatePost();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { postId } = useParams<{ postId?: string }>();

  const isUpdateMode = !!postId;

  const postingFromMethods = useForm<FormValues>({
    defaultValues: {
      images: [],
      content: '',
      is_with_teacher: false,
    },
    mode: 'onSubmit',
  });

  const handleCancel = () => {
    navigate('/student-main'); // 원하는 경로로 이동
  };

  // 이미지를 업로드 할 때, Parent 컴포넌트에서 이미지를 받아오는 함수
  const handleImageUpload = (files: File[]) => {
    postingFromMethods.setValue('images', files);
  };

  //폼데이터 준비
  const onSubmit = async (data: FormValues) => {
    if (!data.images || data.images.length === 0) {
      showToast('최소 하나의 이미지를 등록해야 합니다.');
      return;
    }

    if (!data.content.trim()) {
      showToast('내용을 입력해주세요.');
      return;
    }

    const postingData: CreatePostingRequestParams = {
      image1: data.images[0],
      image2: data.images[1] || null,
      image3: data.images[2] || null,
      content: data.content,
      is_with_teacher: data.is_with_teacher,
    };

    if (isUpdateMode) {
      try {
        console.log('Update Mode Data:', {
          postId,
          images: data.images,
          content: data.content,
          is_with_teacher: data.is_with_teacher,
        });

        updatePostMutation({
          image1: data.images[0],
          image2: data.images[1] || null,
          image3: data.images[2] || null,
          content: data.content,
          is_with_teacher: data.is_with_teacher,
        });
      } catch (error) {
        console.error('업데이트 호출 에러:', error);
        showToast('포스트 업데이트 중 오류가 발생했습니다.');
      }
    } else {
      try {
        // CreatePostingAPI를 호출하여 서버에 데이터 전송
        const response = await CreatePostingAPI(postingData);
        console.log('포스팅 성공:', response);
        showToast('포스팅이 성공적으로 작성되었습니다!');
        navigate('/student-main');
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      } catch (error) {
        console.error('포스팅 실패:', error);
        showToast('서버 오류가 발생했습니다. 잠시 후 다시 전송 해주세요');
      }
    }
  };

  return (
    <main className='pt-[72px]'>
      <Header title='포스팅하기' />
      <FormProvider {...postingFromMethods}>
        <form
          onSubmit={postingFromMethods.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 px-4 py-4'
        >
          <section className='flex flex-col gap-4'>
            <PostImageUpload onImageUpload={handleImageUpload} />
            <PostTextEditor />
          </section>

          <Controller
            name='is_with_teacher'
            control={postingFromMethods.control}
            render={({ field }) => (
              <label className='flex cursor-pointer items-center gap-2 text-textMainColor'>
                <input
                  type='checkBox'
                  {...field}
                  checked={field.value}
                  value={field.value.toString()}
                  className='size-5 cursor-pointer rounded border-[#DEDEDE] text-primaryHoverColor focus:ring-transparent'
                />
                선생님 협업 여부
              </label>
            )}
          />
          <footer className='flex items-center justify-between'>
            <Button
              variant='cancel'
              type='button'
              name='cancel'
              onClick={handleCancel}
              className='w-[49%]'
            >
              취소
            </Button>
            <Button
              variant='active'
              type='submit'
              name='post'
              className='w-[49%]'
            >
              포스팅
            </Button>
          </footer>
        </form>
      </FormProvider>
    </main>
  );
};

export default CreatePostPage;
