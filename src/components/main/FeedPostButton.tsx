// import { useCallback, useState } from 'react';

// import Heart from '../../assets/feedPost/heart.svg';
import { useFetchCommentQuery } from '@/api/comment/fetchComment/fetchComment.hooks';
import chat from '../../assets/feedPost/chat.svg';
// import fullHeart from '../../assets/feedPost/fullHeart.svg';
import useCommentModalStore from '@/stores/useCommentModalStore';
import LoadingPage from '@/pages/status/loadingPage';
import ErrorPage from '@/pages/status/errorPage';

// import CommentModal from '../modal/CommentModal';

type FeedPostButtonProps = {
  like_count: number;
  // comment_count: number;
  post_id: string;
};

const FeedPostButton = ({
  like_count,
  // comment_count,
  post_id,
}: FeedPostButtonProps) => {
  const { setIsModalOpen, setPostId } = useCommentModalStore();

  const {
    data: commentData,
    isError,
    isLoading,
  } = useFetchCommentQuery(post_id);

  // const toggleHeart = useCallback(() => {
  //   setIsLiked((prev) => {
  //     const updatedLikeCount = prev ? likeCount - 1 : likeCount + 1;
  //     setLikeCount(Math.max(updatedLikeCount, 0));
  //     return !prev;
  //   });
  // }, [likeCount]);

  const openCommentModal = () => {
    setPostId(post_id);
    setIsModalOpen(true);
  };

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;
  return (
    <>
      <li className='flex items-center gap-6'>
        <div className='flex gap-1'>
          <button className=''>
            {/* {!isLiked ? (
              <img src={Heart} alt='HeartIcon' />
            ) : (
              <img src={fullHeart} alt='fullHeartIcon' />
            )} */}
          </button>
          <span className='text-textMainColor'>{like_count}</span>
        </div>

        <div className='flex gap-1'>
          <button onClick={openCommentModal}>
            <img src={chat} alt='fullHeartIcon' />
          </button>
          <p className='text-textMainColor'>{commentData?.total_count}</p>
        </div>

        {/* <span className='ml-[3px]'>{commentCount}</span> */}
      </li>
    </>
  );
};

export default FeedPostButton;
