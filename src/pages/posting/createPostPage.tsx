import Button from '../../components/common/Button';
import CheckBox from '../../components/common/CheckBox';
import Header from '../../components/common/Header';
import PostImageUpload from '../../components/posting/PostImageUpload';
import PostTextEditor from '../../components/posting/PostTextEditor';

const CreatePostPage = () => {
  return (
    <main className='space-y-3 pt-[72px]'>
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
          // onClick={handleButtonClick}
          name='cancel'
          className='w-[196.5px] bg-cancelButtonColor hover:bg-hobbyText'
        >
          취소
        </Button>
        <Button
          // onClick={handleButtonClick}
          name='post'
          className='w-[196.5px]'
        >
          포스팅
        </Button>
      </footer>
    </main>
  );
};

export default CreatePostPage;
