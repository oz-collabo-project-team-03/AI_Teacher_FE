import { Controller, FormProvider, useForm } from 'react-hook-form';

import Button from '../../components/common/Button';
import CheckBox from '../../components/common/CheckBox';
import { CreatePostingRequestParams } from '@/types/createPostingType';
import Header from '../../components/common/Header';
import PostImageUpload from '../../components/posting/PostImageUpload';
import PostTextEditor from '../../components/posting/PostTextEditor';
import { useCreatePostingMutation } from '@/api/createPosting/createPosting.hooks';
import { useToast } from '@/hooks/useToast';

const CreatePostPage = () => {
  const { showToast } = useToast();
  const postingFromMethods = useForm({
    defaultValues: {
      title: '',
      content: '',
      images: [],
      is_with_teacher: false,
    },
    mode: 'onSubmit',
  });

  //API호출
  const { mutateAsync: createPosting } = useCreatePostingMutation({
    onSuccess: (data) => {
      console.log('포스팅 성공:', data);
      showToast('포스팅이 성공적으로 작성되었습니다!');
    },
    onError: (error: any) => {
      console.error('포스팅 실패:', error);
      if (error.response && error.response.status === 404) {
        showToast('서버 오류가 발생했습니다. 잠시 후 다시 전송 해주세요');
      } else {
        showToast('포스팅 내용이 비어 있습니다. 내용을 입력해 주세요.');
      }
    },
  });

  //폼데이터 준비
  const onSubmit = async (data: any) => {
    const postingData: CreatePostingRequestParams = {
      content: data.content,
      is_with_teacher: data.is_with_teacher,
      image1: data.images[0] || null,
      image2: data.images[1] || null,
      image3: data.images[2] || null,
    };
    try {
      await createPosting(postingData);
    } catch (error) {
      console.error('포스팅 실패', error);
    }
  };

  return (
    <main className='space-y-3 pt-[72px]'>
      <Header title='포스팅하기' />
      <FormProvider {...postingFromMethods}>
        <form onSubmit={postingFromMethods.handleSubmit(onSubmit)}>
          <section>
            <PostImageUpload />
            <PostTextEditor />
          </section>

          <section className='ml-[12px] mt-[10px] flex h-[35px] items-center'>
            <Controller
              name='is_with_teacher'
              control={postingFromMethods.control}
              render={({ field }) => (
                <CheckBox
                  {...field}
                  checked={field.value}
                  value={field.value.toString()}
                >
                  <p className='text-captionColor'>선생님 협업 여부</p>
                </CheckBox>
              )}
            />
          </section>
          <footer className='mt-[27px] flex h-[62px] items-center justify-center gap-2.5 text-[18px]'>
            <Button
              type='button'
              name='cancel'
              className='w-[196.5px] bg-cancelButtonColor hover:bg-hobbyText'
            >
              취소
            </Button>
            <Button type='submit' name='post' className='w-[196.5px]'>
              포스팅
            </Button>
          </footer>
        </form>
      </FormProvider>
    </main>
  );
};

export default CreatePostPage;
