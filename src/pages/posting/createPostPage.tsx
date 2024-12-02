import { Controller, FormProvider, useForm } from 'react-hook-form';

import Button from '../../components/common/Button';
import { CreatePostingAPI } from '@/api/createPosting/createPostingAPI';
import { CreatePostingRequestParams } from '@/types/createPostingType';
import Header from '../../components/common/Header';
import PostImageUpload from '../../components/posting/PostImageUpload';
import PostTextEditor from '../../components/posting/PostTextEditor';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';

type FormValues = {
  images: File[];
  content: string;
  is_with_teacher: boolean;
};

const CreatePostPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
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

    try {
      // CreatePostingAPI를 호출하여 서버에 데이터 전송
      const response = await CreatePostingAPI(postingData);
      console.log('포스팅 성공:', response);
      // showToast('포스팅이 성공적으로 작성되었습니다!');
      navigate('/student-main');
    } catch (error) {
      console.error('포스팅 실패:', error);
      showToast('서버 오류가 발생했습니다. 잠시 후 다시 전송 해주세요');
    }
  };

  return (
    <main className='space-y-3 pt-[72px]'>
      <Header title='포스팅하기' />
      <FormProvider {...postingFromMethods}>
        <form onSubmit={postingFromMethods.handleSubmit(onSubmit)}>
          <section>
            <PostImageUpload onImageUpload={handleImageUpload} />
            <PostTextEditor />
          </section>

          <section className='ml-[12px] mt-[10px] flex h-[35px] items-center'>
            <Controller
              name='is_with_teacher'
              control={postingFromMethods.control}
              render={({ field }) => (
                <label className='flex min-w-0 flex-1 cursor-pointer items-center text-black'>
                  <input
                    type='checkBox'
                    {...field}
                    checked={field.value}
                    value={field.value.toString()}
                    className='mr-[10px] size-4 cursor-pointer rounded border-[#DEDEDE] text-primaryHoverColor focus:ring-transparent'
                  />
                  선생님 협업 여부
                </label>
              )}
            />
          </section>
          <footer className='mt-[40px] flex h-[62px] items-center justify-center gap-2.5 p-[12px] pb-[130px] text-[18px]'>
            <Button
              type='button'
              name='cancel'
              onClick={handleCancel}
              className='w-[50%] bg-cancelButtonColor hover:bg-hobbyText'
            >
              취소
            </Button>
            <Button type='submit' name='post' className='w-[50%]'>
              포스팅
            </Button>
          </footer>
        </form>
      </FormProvider>
    </main>
  );
};

export default CreatePostPage;
