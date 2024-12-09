import ErrorPage from '@/pages/status/errorPage';
import Heart from '../../assets/feedPost/heart.svg';
import LoadingPage from '@/pages/status/loadingPage';
import chat from '../../assets/feedPost/chat.svg';
import fullHeart from '../../assets/feedPost/fullHeart.svg';
import useCommentModalStore from '@/stores/useCommentModalStore';
import { useFetchCommentQuery } from '@/api/comment/fetchComment/fetchComment.hooks';
import { useFetchLikeStatus } from '@/api/homeFeed/heartBtn/heartBtnGet/fetchLikes.hooks';
import { useHeartCreateMutation } from '@/api/homeFeed/heartBtn/heartBtnClick/heartCreate.hooks';
import { useQueryClient } from '@tanstack/react-query';

type FeedPostButtonProps = {
  post_id: string;
};

const FeedPostButton = ({ post_id }: FeedPostButtonProps) => {
  const { setIsModalOpen, setPostId } = useCommentModalStore();

  const {
    data: commentData,
    isError,
    isLoading,
  } = useFetchCommentQuery(post_id);

  const { mutate: toggleHeartMutation } = useHeartCreateMutation();
  const queryClient = useQueryClient();

  const { data: likeData } = useFetchLikeStatus(post_id);

  const isLiked = likeData?.liked;

  const handleHeartClick = () => {
    // like 상태 반전 (true <-> false)
    const newLikeState = !isLiked;

    // 서버로 like 상태와 함께 요청 보내기
    toggleHeartMutation(
      { post_id, like: newLikeState },
      {
        onSuccess: () => {
          // 서버에서 받은 데이터를 반영하여 로컬 상태 업데이트
          queryClient.setQueryData(['likeStatus', post_id], (oldData: any) => {
            return {
              ...oldData,
              liked: newLikeState,
              like_count: newLikeState
                ? oldData.like_count + 1
                : oldData.like_count - 1,
            };
          });
        },
        onError: (error: any) => {
          console.error(
            '좋아요 상태 변경 실패',
            error.response?.data || error.message
          );
        },
      }
    );
  };

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
          <button onClick={handleHeartClick} className=''>
            <img src={isLiked ? fullHeart : Heart} alt='HeartIcon' />
          </button>
          <span className='text-textMainColor'>{likeData?.like_count}</span>
        </div>

        <div className='flex gap-1'>
          <button onClick={openCommentModal}>
            <img src={chat} alt='fullHeartIcon' />
          </button>
          <p className='text-textMainColor'>{commentData?.total_count}</p>
        </div>
      </li>
    </>
  );
};

export default FeedPostButton;
