import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

import { Comment } from '@/api/comment/fetchComment/fetchCommentType';
import CommentHeader from '../comment/CommentHeader';
import CommentList from '../comment/CommentList';
import sendIcon from '../../assets/comment/send.svg';
import student1 from '../../assets/editProfile/student/studentIcon2.png';
import { useFetchCommentMutation } from '@/api/comment/writeComment/writeComment.hooks';
import { useFetchCommentQuery } from '@/api/comment/fetchComment/fetchComment.hooks';
import { useToast } from '@/hooks/useToast';

type commentFormData = {
  comment: string;
};

const CommentModal = () => {
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [commentValue, setCommentValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<commentFormData>();

  const post_id = 1; //임시 아이디

  const {
    data: commentData,
    isLoading,
    isError,
    refetch,
  } = useFetchCommentQuery(post_id);

  const comments: Comment[] = commentData ? commentData.comments : [];

  const { mutate: postComment } = useFetchCommentMutation({
    onSuccess: () => {
      showToast('댓글등록성공');
      refetch();
      setCommentValue('');
      setIsInputEmpty(true);
    },
    onError: () => {
      showToast('댓글 등록 중 오류 발생');
    },
  });

  const commentOnSubmit: SubmitHandler<commentFormData> = (data) => {
    const newComment = data.comment?.trim();
    if (newComment) {
      postComment({
        post_id,
        FetchCommentData: {
          content: newComment,
          tags: [],
        },
      });
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

  //get요청 에러처리
  useEffect(() => {
    if (isError) showToast('댓글을 불러오는 데 실패했습니다.');
  }, [isError, showToast]);

  return (
    <section className='flex h-[70vh] flex-col'>
      <CommentHeader />
      <section className='custom-scrollbar flex-1 overflow-y-auto px-[21px] py-[21px]'>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>댓글을 불러오는 데 실패했습니다.</p>
        ) : (
          <CommentList comments={comments} refetchComments={refetch} />
        )}
      </section>
      <form
        onSubmit={handleSubmit(commentOnSubmit)}
        className='bottom-0 flex items-center gap-3 border-t border-chatListHoverColor px-[17px] py-[16px]'
      >
        <img src={student1} alt='comment user' className='h-[35px]' />
        <div className='!important relative flex w-full items-center rounded-[15px] bg-commuInputColor p-[14px] placeholder:text-center'>
          <textarea
            value={commentValue}
            {...register('comment', { required: '댓글을 입력해주세요.' })}
            onChange={handleTextareaInput}
            className='scrollbar-hide mt-[7px] h-[30px] w-[90%] resize-none border-none bg-transparent p-0 text-[14px] focus:ring-0'
            placeholder='댓글을 입력해주세요'
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
