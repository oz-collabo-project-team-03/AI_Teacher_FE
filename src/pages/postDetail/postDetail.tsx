import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import CommentModal from '@/components/modal/CommentModal';
import ErrorPage from '../status/errorPage';
import FeedPost from '@/components/main/FeedPost';
import Header from '@/components/common/Header';
import LoadingPage from '../status/loadingPage';
import NotfoundPage from '../status/notfoundPage';
import { twMerge } from 'tailwind-merge';
import useCommentModalStore from '@/stores/useCommentModalStore';
import { useDetailPostsInfiniteGetQuery } from '@/api/postDetail/postDetail.hooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const PostDetail = () => {
  const [initialScrollComplete, setInitialScrollComplete] = useState(false);

  const { userId } = useParams();
  const { isModalOpen, setIsModalOpen } = useCommentModalStore();

  const location = useLocation();

  const selectedPostId = new URLSearchParams(location.search).get('selected');

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

  // 컴포넌트가 리렌더링될 때마다 `scrollToElement` 함수가 새로 생성되는 것을 방지
  const scrollToElement = useCallback((element: HTMLElement) => {
    element.scrollIntoView({ behavior: 'instant', block: 'start' });
    setInitialScrollComplete(true);
  }, []);

  // `useCallback`을 사용하지 않으면 컴포넌트가 리렌더링될 때마다
  // 새로운 함수가 생성되어 불필요한 `useLayoutEffect` 실행이 발생할 수 있습니다
  // DOM 조작과 애니메이션 프레임 요청을 포함하는 복잡한 로직을 수행하므로,
  // 불필요한 함수 재생성을 방지하는 것이 중요합니다
  const findAndScrollToPost = useCallback(() => {
    const element = document.getElementById(selectedPostId!);
    if (element) {
      document.body.style.opacity = '0';
      scrollToElement(element);

      // 브라우저의 다음 리페인트 시점에 실행되도록 보장
      // 브라우저가 최적의 시점에 변경사항을 화면에 반영할 수 있어 더 효율적인 렌더링이 가능
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
      return true;
    }
    return false;
  }, [selectedPostId, scrollToElement]);

  // 시각적 깜빡임 최소화
  useLayoutEffect(() => {
    const scrollToSelectedPost = async () => {
      if (!selectedPostId || !data) return;

      try {
        if (!findAndScrollToPost()) {
          while (hasNextPage) {
            await fetchNextPage();
            await new Promise((resolve) => setTimeout(resolve, 50));
            if (findAndScrollToPost()) break;
          }
        }
      } catch (error) {}
    };

    scrollToSelectedPost();
  }, [selectedPostId, data, hasNextPage, fetchNextPage, findAndScrollToPost]);

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return <ErrorPage error={error} resetError={() => refetch()} />;
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
    <div
      className={twMerge(
        'h-full pt-[72px]',
        initialScrollComplete ? 'opacity-100' : 'opacity-0'
      )}
    >
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
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              {data.pages.flatMap((page) =>
                page.posts.map((post) => (
                  <CommentModal key={post.post_id} post_id={post.post_id} />
                ))
              )}
              {/* <CommentModal post_id={post_Id} /> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostDetail;
