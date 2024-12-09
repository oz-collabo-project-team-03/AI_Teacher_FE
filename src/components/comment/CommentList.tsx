import { Comment } from '@/api/comment/fetchComment/fetchCommentType';
import ProfileImage from './CommentProfileImage';
import ReComment from './ReComment';
import { useDeleteCommentMutation } from '@/api/comment/deleteComment/deleteComment.hooks';
import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useQueryClient } from '@tanstack/react-query';

type CommentProps = {
  comments: Comment[];
  // refetchComments: () => void;
  onReplyClick: (commentId: number) => void; // 추가
};

const CommentList = ({
  comments,
  // refetchComments,
  onReplyClick,
}: CommentProps) => {
  const [expandedCommentIds, setExpandedCommentIds] = useState<Set<number>>(
    new Set()
  );
  const { profileData } = useProfile();

  const queryClient = useQueryClient();
  const { mutate: deleteComment, status } = useDeleteCommentMutation({
    onSuccess: (data) => {
      console.log(data.message);
      // refetchComments(); //댓글 삭제 후 댓글 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: () => {
      console.log('삭제실패');
    },
  });

  //댓글 삭제
  const handleDeleteClick = (comment_id: number) => {
    const confirmation = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (confirmation) {
      deleteComment({ comment_id }); // 삭제 요청
    }
  };

  const handleShowMore = (commentId: number) => {
    setExpandedCommentIds((prev) => {
      const newExpandedCommentIds = new Set(prev);
      if (newExpandedCommentIds.has(commentId)) {
        newExpandedCommentIds.delete(commentId);
      } else {
        newExpandedCommentIds.add(commentId);
      }
      return newExpandedCommentIds;
    });
  };

  return (
    <section className='flex h-full flex-col'>
      {comments.length === 0 ? (
        <div className='flex h-full flex-col items-center justify-center'>
          <p className='text-[20px] font-bold'>아직 댓글이 없습니다. </p>
          <p className=''>댓글을 남겨주세요.</p>
        </div>
      ) : (
        comments.map((comment) => (
          <article key={comment.comment_id} className='mb-[20px]'>
            <div className='flex gap-2'>
              <ProfileImage src={comment.profile_image} />
              <div className='w-full'>
                <p className='text-[16px] font-semibold'>
                  {comment.author_nickname}
                </p>
                <div className='whitespace-normal break-words text-[14px]'>
                  {comment.content}
                </div>
                <button
                  className='mr-[5px] text-[12px] text-captionColor hover:text-repleText'
                  onClick={() => onReplyClick(comment.comment_id)}
                >
                  답글
                </button>
                {profileData?.id === comment.user_id && (
                  <button
                    className='text-[12px] text-captionColor hover:text-repleText'
                    onClick={() => handleDeleteClick(comment.comment_id)}
                    disabled={status === 'pending'} // 삭제 중에는 버튼 비활성화
                  >
                    삭제
                  </button>
                )}
                {comment.recomment_count > 0 && (
                  <div className='my-2 flex items-center gap-1 text-[12px] text-black/35'>
                    <div className='mr-2 h-px w-8 bg-black/35'></div>
                    <div>댓글 {comment.recomment_count}개 </div>
                    <button
                      onClick={() => handleShowMore(comment.comment_id)}
                      className='hover:text-repleText'
                    >
                      {expandedCommentIds.has(comment.comment_id)
                        ? '접기'
                        : '더보기'}
                    </button>
                  </div>
                )}
                {/* 대댓글 펼침 */}
                {expandedCommentIds.has(comment.comment_id) && (
                  <div className='ml-6 flex flex-col gap-4'>
                    {comment.children.map((recomment) => (
                      <ReComment
                        key={recomment.comment_id}
                        comment={recomment}
                        handleDeleteClick={handleDeleteClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))
      )}
    </section>
  );
};

export default CommentList;
