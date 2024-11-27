import { AnimatePresence, motion } from 'framer-motion';

import CommentModal from '@components/modal/CommentModal';
import FeedPost from '../../components/main/FeedPost';
import MainHeader from '../../components/main/MainHeader';
import { twMerge } from 'tailwind-merge';
import useCommentModalStore from '@/stores/useCommentModalStore';

const HomeFeedPage = () => {
  const posts = [1, 2, 3]; //임시배열
  const hideScrollbar = true;
  const { isModalOpen, setIsModalOpen } = useCommentModalStore();
  const closeCommentModal = () => setIsModalOpen(false);

  const modalVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    closed: {
      opacity: 0,
      y: 100,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  return (
    <div className='h-svh'>
      <MainHeader />
      <div
        className={twMerge(
          'h-full overflow-auto pb-[82px] pt-[72px]',
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
      <AnimatePresence mode='wait'>
        {isModalOpen && (
          <motion.div
            className='fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center'
            variants={modalVariants}
            initial='closed'
            animate='open'
            exit='closed'
            key='comment-modal'
          >
            <div className='relative w-full rounded-t-[15px] bg-white md:w-[425px] lg:w-[425px]'>
              <button
                className='absolute right-4 top-1 text-3xl'
                onClick={closeCommentModal}
              >
                &times;
              </button>
              <CommentModal />
            </div>
          </motion.div>
          // </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeFeedPage;
