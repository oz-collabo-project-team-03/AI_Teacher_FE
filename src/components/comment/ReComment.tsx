import { Comment } from '@/api/comment/fetchComment/fetchCommentType';
import ProfileImage from './CommentProfileImage';
import { useProfile } from '@/hooks/useProfile';

type RecommentProps = {
  comment: Comment;
  handleDeleteClick: (comment_id: number) => void;
};

const ReComment = ({ comment, handleDeleteClick }: RecommentProps) => {
  const { profileData } = useProfile();
  return (
    <div>
      <div className='flex gap-2'>
        <ProfileImage src={comment.profile_image} />
        <div className='w-full'>
          <p className='text-[16px] font-semibold'>{comment.author_nickname}</p>
          <div className='whitespace-normal break-words text-[14px]'>
            {comment.content}
          </div>
          {profileData?.id === comment.user_id && (
            <button
              className='text-[12px] text-captionColor hover:text-repleText'
              onClick={() => handleDeleteClick(comment.comment_id)}
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReComment;
