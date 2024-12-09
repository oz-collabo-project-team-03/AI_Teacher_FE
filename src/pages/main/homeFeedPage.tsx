import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import CommentModal from '@components/modal/CommentModal';
import ErrorPage from '../status/errorPage';
import FeedPost from '../../components/main/FeedPost';
import LoadingPage from '../status/loadingPage';
import MainHeader from '../../components/main/MainHeader';
import NotfoundPage from '../status/notfoundPage';
import TeacherListModal from '@/components/modal/TeacherListModal';
import { useAllPostsInfiniteGetQuery } from '@/api/homeFeed/homeFeed.hooks';
import useCommentModalStore from '@/stores/useCommentModalStore';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useProfile } from '@/hooks/useProfile';
import { useQueryClient } from '@tanstack/react-query';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const HomeFeedPage = () => {
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(true);

  const { profileData } = useProfile();
  const { isModalOpen, setIsModalOpen, postId } = useCommentModalStore();
  const queryClient = useQueryClient();

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

  // 데이터가 로드되었는지 확인
  const isDataLoaded = !!data?.pages.length;

  // 스크롤이 있는 div 요소를 참조하기 위한 useRef 생성
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useScrollPosition(scrollContainerRef, isDataLoaded);

  // 선생님 모달 닫는 함수
  const closeTeacherModal = () => {
    setIsTeacherModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ['profile'] });
  };

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  if (!data?.pages.length) {
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
    <div className='h-full pt-[72px]'>
      <MainHeader />

      <div ref={scrollContainerRef} className='custom-scrollbar h-full'>
        {data.pages.map((page) =>
          page.posts?.map((post) => (
            <FeedPost key={post.post_id} posts={post} />
          ))
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

      {/* 소셜 로그인 스터디 그룹 모달 */}
      {!profileData?.study_group && isTeacherModalOpen && (
        <TeacherListModal closeTeacherModal={closeTeacherModal} />
      )}
    </div>
  );
};

export default HomeFeedPage;
