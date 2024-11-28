import { AnimatePresence, motion } from 'framer-motion';

import CommentModal from '@components/modal/CommentModal';
import FeedPost from '../../components/main/FeedPost';
import MainHeader from '../../components/main/MainHeader';
import useCommentModalStore from '@/stores/useCommentModalStore';
import { useAllPostsInfiniteGetQuery } from '@/api/homeFeed/homeFeed.hooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import LoadingPage from '../status/loadingPage';
import ErrorPage from '../status/errorPage';
import NotfoundPage from '../status/notfoundPage';

const HomeFeedPage = () => {
  const { isModalOpen, setIsModalOpen } = useCommentModalStore();
  const closeCommentModal = () => setIsModalOpen(false);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  } = useAllPostsInfiniteGetQuery();

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  if (!data || !data.pages) {
    return <NotfoundPage />;
  }

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
    <div className='h-full overflow-auto pb-[64px] pt-[72px]'>
      <MainHeader />
      {data.pages.map((page) =>
        page.posts.map((post) => <FeedPost key={post.post_id} posts={post} />)
      )}

      <div ref={observerRef} className='h-2' />

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
                className='absolute text-3xl right-4 top-1'
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
