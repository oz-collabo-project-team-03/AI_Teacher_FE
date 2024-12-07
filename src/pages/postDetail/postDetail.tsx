import { useDetailPostsInfiniteGetQuery } from '@/api/postDetail/postDetail.hooks';
import { AnimatePresence, motion } from 'framer-motion';
import FeedPost from '@/components/main/FeedPost';
import CommentModal from '@/components/modal/CommentModal';
import useCommentModalStore from '@/stores/useCommentModalStore';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/common/Header';
import NotfoundPage from '../status/notfoundPage';
import ErrorPage from '../status/errorPage';
import LoadingPage from '../status/loadingPage';

const PostDetail = () => {
  const { userId } = useParams();
  const { isModalOpen, setIsModalOpen, postId } = useCommentModalStore();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedPostId = searchParams.get('selected');

  const closeCommentModal = () => setIsModalOpen(false);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  } = useDetailPostsInfiniteGetQuery(Number(userId));

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  useEffect(() => {
    if (selectedPostId) {
      const element = document.getElementById(selectedPostId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedPostId, data]);

  useEffect(() => {
    const scrollToSelectedPost = async () => {
      if (!selectedPostId || !data) return;

      const element = document.getElementById(selectedPostId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      // 현재 로드된 페이지들에서 포스트를 찾지 못한 경우
      if (hasNextPage) {
        await fetchNextPage();
      }
    };

    scrollToSelectedPost();
  }, [selectedPostId, data, hasNextPage, fetchNextPage]);

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  if (!data || !data.pages) {
    return <NotfoundPage />;
  }

  const headerTitle =
    userId && data?.pages[0]?.posts[0]?.nickname
      ? `${data.pages[0].posts[0].nickname}님의 게시글`
      : '내 게시글';

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
    <div className='h-full pt-[72px]'>
      <Header title={headerTitle} />

      <div className='custom-scrollbar h-full'>
        {data.pages.map((page) =>
          page.posts.map((post) => <FeedPost key={post.post_id} posts={post} />)
        )}

        <div ref={observerRef} className='h-2' />
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
              <CommentModal post_id={postId} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostDetail;
