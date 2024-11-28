import { useDetailPostsInfiniteGetQuery } from '@/api/postDetail/postDetail.hooks';
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedPostId = searchParams.get('selected');

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
  } = useDetailPostsInfiniteGetQuery(userId);

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
  }, [selectedPostId]);

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

  return (
    <div className='scrollbar-hide flex w-full flex-col overflow-auto pb-[64px] pt-[72px]'>
      <Header title={headerTitle} />
      {data.pages.map((page) =>
        page.posts.map((post) => <FeedPost key={post.post_id} posts={post} />)
      )}

      <div ref={observerRef} className='h-2' />

      {isModalOpen && (
        <div className='fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center'>
          <div className='relative w-full rounded-t-[15px] bg-white md:w-[425px] lg:w-[425px]'>
            <button
              className='absolute text-xl right-2 top-2'
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

export default PostDetail;
