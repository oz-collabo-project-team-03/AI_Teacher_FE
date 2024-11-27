import CommentModal from '@components/modal/CommentModal';
import FeedPost from '../../components/main/FeedPost';
import MainHeader from '../../components/main/MainHeader';
import { twMerge } from 'tailwind-merge';
import useFeedPostStore from '@/stores/useFeedPostStore';

const HomeFeedPage = () => {
  const posts = [1, 2, 3]; //임시배열
  const hideScrollbar = true;
  const { isModalOpen, setIsModalOpen } = useFeedPostStore();
  const closeCommentModal = () => setIsModalOpen(false);
  return (
    <div className='h-svh'>
      <MainHeader />
      <div
        className={twMerge(
          'h-full overflow-auto pb-[62px] pt-[72px]',
          hideScrollbar && 'scrollbar-hide'
        )}
      >
        <div className='space-y-8'>
          {' '}
          {/* 각 게시물 간 여백 추가 */}
          {posts.map((index) => (
            <FeedPost key={index} />
          ))}
        </div>
      </div>
      {/* 모달 */}
      {isModalOpen && (
        <div className='fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center'>
          <div className='relative w-full rounded-t-[15px] bg-white md:w-[425px] lg:w-[425px]'>
            <button
              className='absolute right-2 top-2 text-xl'
              onClick={closeCommentModal}
            >
              &times;
            </button>
            <CommentModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeFeedPage;
