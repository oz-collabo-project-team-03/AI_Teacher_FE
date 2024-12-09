import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

import { Comment } from '@/api/comment/fetchComment/fetchCommentType';
import CommentHeader from '../comment/CommentHeader';
import CommentList from '../comment/CommentList';
import sendIcon from '../../assets/comment/send.svg';
import studentIcon1 from '@assets/editProfile/student/studentIcon1.png';
import { useFetchCommentMutation } from '@/api/comment/writeComment/writeComment.hooks';
import { useFetchCommentQuery } from '@/api/comment/fetchComment/fetchComment.hooks';
import { useToast } from '@/hooks/useToast';
import CommentModalSkeleton from '../comment/CommentModalSkeleton';
import { useProfile } from '@/hooks/useProfile';
import { useQueryClient } from '@tanstack/react-query';

type CommentModalProps = {
  post_id: string;
};

type commentFormData = {
  comment: string;
};

const CommentModal = ({ post_id }: CommentModalProps) => {
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [commentValue, setCommentValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);
  const { showToast } = useToast();
  const { profileData } = useProfile();

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<commentFormData>();

  //댓글 데이터
  const {
    data: commentData,
    isError,
    isLoading,
  } = useFetchCommentQuery(post_id);
  const comments: Comment[] = commentData ? commentData.comments : [];

  // 댓글 데이터 콘솔로 확인
  useEffect(() => {
    console.log('댓글 데이터:', comments);
  }, [comments]);

  //댓글 작성 post요청
  const { mutate: postComment } = useFetchCommentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setCommentValue('');
      setTargetCommentId(null);
    },
    onError: () => {
      showToast('로그인이 필요한 서비스입니다. 로그인 후 다시 시도해주세요.');
    },
  });

  //사용자 댓글 폼 제출 처리
  const commentOnSubmit: SubmitHandler<commentFormData> = (data) => {
    const newComment = data.comment?.trim();
    if (newComment) {
      postComment({
        post_id: post_id,
        FetchCommentData: {
          content: newComment,
          parent_comment_id: targetCommentId ?? undefined, //댓글_대댓글 구분
          author_nickname: profileData?.nickname ?? 'Anonymous',
        },
      });

      if (textareaRef.current) {
        textareaRef.current.style.height = '30px'; // 기본 높이로 리셋
      }
      setValue('comment', '');
      setCommentValue('');
      setIsInputEmpty(true);
    } else {
      showToast('댓글을 입력해주세요.');
    }
  };

  //textarea 높이제한 변수
  const MAX_ROWS = 7;
  const LINE_HEIGHT = 20;
  const MAX_HEIGHT = LINE_HEIGHT * MAX_ROWS;
  const MAX_LENGTH = 300;

  //textarea 높이조절 (다른방법 찾아봐야함)
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.value.substring(0, MAX_LENGTH);

    target.style.height = '30px';
    target.style.height = `${Math.min(target.scrollHeight, MAX_HEIGHT)}px`;

    setValue('comment', value);
    setCommentValue(value);
    setIsInputEmpty(value.trim() === '');
  };

  // 대댓글 대상 설정
  const handleReplyClick = (commentId: number) => {
    setTargetCommentId(commentId);
  };

  // 대댓글 대상 취소
  const handleCancelReply = () => {
    setTargetCommentId(null);
  };

  //get요청 에러처리
  useEffect(() => {
    if (isError) showToast('댓글을 불러오는 데 실패했습니다.');
  }, [isError, showToast]);

  return (
    <section className='flex h-[70vh] flex-col'>
      <CommentHeader />
      <section className='custom-scrollbar flex-1 overflow-y-auto px-[21px] py-[21px]'>
        {isLoading ? (
          <CommentModalSkeleton />
        ) : isError ? (
          <p>댓글을 불러오는 데 실패했습니다.</p>
        ) : (
          <CommentList
            comments={comments}
            onReplyClick={handleReplyClick}
            // refetchComments={refetch}
          />
        )}
      </section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isInputEmpty) {
            handleSubmit(commentOnSubmit)();
          }
        }}
        className={`bottom-0 flex items-center gap-3 border-t border-chatListHoverColor px-[17px] py-[16px] transition-all duration-300 ${
          targetCommentId ? 'pt-8' : ''
        }`}
      >
        <img
          src={profileData?.profile_image || studentIcon1}
          alt='comment user'
          className='h-[35px]'
        />
        <div className='!important relative flex w-full items-center rounded-[15px] bg-commuInputColor p-[14px] placeholder:text-center'>
          {targetCommentId && (
            <div className='absolute left-0 top-[-24px] text-sm text-gray-500'>
              {comments.find(
                (comment) => comment.comment_id === targetCommentId
              )?.author_nickname || '알 수 없음'}
              님에게 대댓글 작성중{' '}
              <button
                type='button'
                onClick={handleCancelReply}
                className='text-blue-500'
              >
                취소
              </button>
            </div>
          )}
          <textarea
            value={commentValue}
            {...register('comment', { required: '댓글을 입력해주세요.' })}
            onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
            onCompositionEnd={() => setIsComposing(false)} //
            onChange={handleTextareaInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
                e.preventDefault(); // 기본 Enter 동작 방지
                // if (!isInputEmpty) {
                //   handleSubmit(commentOnSubmit)(); // 한 번만 제출
                // }
                if (commentValue.trim() !== '') {
                  handleSubmit(commentOnSubmit)();
                  setCommentValue('');
                }
              }
            }}
            className='scrollbar-hide mt-[7px] h-[30px] w-[90%] resize-none border-none bg-transparent p-0 text-[14px] focus:ring-0'
            placeholder={
              targetCommentId
                ? '대댓글을 입력하세요...'
                : '댓글을 입력하세요...'
            }
            aria-label='댓글 입력'
            maxLength={MAX_LENGTH}
            ref={textareaRef}
          />

          <button
            type='submit'
            className='absolute right-1 transform rounded p-2 transition-transform'
            disabled={isInputEmpty}
          >
            <img
              src={sendIcon}
              alt='Send Icon'
              className='h-[30px] w-[30px]'
              style={{
                filter:
                  isInputEmpty || !!errors.comment
                    ? ''
                    : 'invert(36%) sepia(66%) saturate(338%) hue-rotate(200deg) brightness(90%) contrast(92%)',
              }}
            />
          </button>
        </div>
      </form>
    </section>
  );
};

export default CommentModal;
