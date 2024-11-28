import { usePostsInfiniteGetQuery } from '@/api/postDetail/postDetail.hooks';
import FeedPost from '@/components/main/FeedPost';
import CommentModal from '@/components/modal/CommentModal';
import useCommentModalStore from '@/stores/useCommentModalStore';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const PostDetail = () => {
  const { isModalOpen, setIsModalOpen } = useCommentModalStore();
  const closeCommentModal = () => setIsModalOpen(false);

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    usePostsInfiniteGetQuery();

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p>데이터를 불러오는데 실패했습니다. 다시 시도해주세요.</p>
      </div>
    );
  }

  if (!data || !data.pages) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className='flex w-full flex-col pb-[65px]'>
      {data.pages.map((page) =>
        page.posts.map((post) => <FeedPost key={post.post_id} posts={post} />)
      )}

      <div ref={observerRef} className='h-2' />

      {hasNextPage && (
        <div className='h-10' onClick={() => fetchNextPage()}>
          더 불러오기
        </div>
      )}

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
