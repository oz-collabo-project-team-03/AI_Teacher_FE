import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

import Comment from '../comment/Comment';
import CommentHeader from '../comment/CommentHeader';
import sendIcon from '../../assets/comment/send.svg';
import student1 from '../../assets/editProfile/student/studentIcon2.png';
import { useToast } from '@/hooks/useToast';

type commentFormData = {
  comment: string;
};

const CommentModal = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [commentValue, setCommentValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<commentFormData>();

  //textarea 높이제한 변수
  const MAX_ROWS = 7;
  const LINE_HEIGHT = 20;
  const MAX_HEIGHT = LINE_HEIGHT * MAX_ROWS;
  const MAX_LENGTH = 300;

  // 댓글 제출
  const commentOnSubmit: SubmitHandler<commentFormData> = (data) => {
    const newComment = data.comment?.trim();
    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment]);
      reset();
      setCommentValue('');
      setIsInputEmpty(true);
      if (textareaRef.current) {
        textareaRef.current.style.height = '30px'; // textarea 높이 초기화
      }
    } else {
      showToast('댓글을 입력해주세요.');
      setIsInputEmpty(true);
    }
  };

  //textarea 높이조절
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.value.substring(0, MAX_LENGTH);
    target.style.height = '30px';
    target.style.height = `${Math.min(target.scrollHeight, MAX_HEIGHT)}px`;

    setValue('comment', value);
    setCommentValue(value);
    setIsInputEmpty(value.trim() === '');
  };

  //에러처리
  useEffect(() => {
    if (errors.comment) {
      showToast('댓글을 입력해주세요.');
    }
  }, [errors.comment, showToast]);

  return (
    <section className='flex h-[70vh] flex-col'>
      <CommentHeader />
      <section className='custom-scrollbar flex-1 overflow-y-auto px-[21px] py-[21px]'>
        <Comment comments={comments} />
      </section>
      <form
        onSubmit={handleSubmit(commentOnSubmit)}
        className='bottom-0 flex items-center gap-3 border-t border-chatListHoverColor px-[17px] py-[16px]'
      >
        <img src={student1} alt='comment user' className='h-[35px]' />
        <div className='relative flex w-full items-center rounded-[15px] bg-commuInputColor p-[14px] placeholder:text-center'>
          <textarea
            value={commentValue}
            {...register('comment', { required: '댓글을 입력해주세요.' })}
            onChange={handleTextareaInput}
            className='scrollbar-hide mt-[7px] h-[30px] w-[90%] resize-none border-none bg-transparent p-0 text-[14px] focus:ring-0'
            placeholder='댓글을 입력해주세요'
            aria-label='댓글 입력'
            maxLength={MAX_LENGTH}
            ref={(el) => {
              textareaRef.current = el;
            }}
          />

          <button
            type='submit'
            className='absolute right-1 transform rounded p-2 transition-transform'
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
