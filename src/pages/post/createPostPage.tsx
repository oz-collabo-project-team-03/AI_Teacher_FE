import Button from '../../components/common/Button';
import CheckBox from '../../components/common/CheckBox';
import Header from '../../components/common/Header';
import PostImageUpload from '../../components/post/PostImageUpload';
import PostTextEditor from '../../components/post/PostTextEditor';
import { useState } from 'react';

const CreatePostPage = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedButton(e.currentTarget.name);
  };

  return (
    <main className='space-y-3'>
      <Header title='포스팅하기' />
      <section>
        <PostImageUpload />
        <PostTextEditor />
      </section>

      <section className='ml-[12px] flex h-[35px] items-center'>
        <CheckBox>
          <p className='text-captionColor'>선생님 협업 여부</p>
        </CheckBox>
      </section>

      <footer className='flex h-[62px] items-center justify-center gap-2.5 text-[18px]'>
        <Button
          onClick={handleButtonClick}
          name='cancel'
          variant={selectedButton === 'cancel' ? 'active' : 'cancel'}
          className='w-[196.5px]'
        >
          취소
        </Button>
        <Button
          onClick={handleButtonClick}
          name='post'
          variant={selectedButton === 'post' ? 'active' : 'cancel'}
          className='w-[196.5px]'
        >
          포스팅
        </Button>
      </footer>
    </main>
  );
};

export default CreatePostPage;
