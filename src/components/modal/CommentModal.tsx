import { SubmitHandler, useForm } from 'react-hook-form';

import Comment from '../comment/Comment';
import CommentHeader from '../comment/CommentHeader';
import student1 from '../../assets/editProfile/student/studentIcon2.png';
import { useState } from 'react';

// import Reply from '../comment/Reply';
// import axios from 'axios';

type FormData = {
  comment: string;
};

const CommentModal = () => {
  const [comments, setComments] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // 댓글 제출
  const commentOnSubmit: SubmitHandler<FormData> = (data) => {
    const newComment = data.comment;
    if (newComment.trim()) {
      try {
        setComments((prevComments) => [...prevComments, newComment]);
        reset();
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.style.height = '30px'; // 기본 높이로 설정
        }
      } catch (error) {
        console.error('댓글 제출 실패:', error);
      }
    }
  };

  //textarea 자동높이조절
  const MAX_ROWS = 7;
  const LINE_HEIGHT = 20;
  const MAX_HEIGHT = LINE_HEIGHT * MAX_ROWS;
  const MAX_LENGTH = 300;

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = '30px';
    target.style.height = `${Math.min(target.scrollHeight, MAX_HEIGHT)}px`;

    if (target.value.length > MAX_LENGTH) {
      target.value = target.value.substring(0, MAX_LENGTH);
    }
  };

  return (
    <section className='h-[700px]'>
      <CommentHeader />
      <section className='px-[21px] py-[28px]'>
        <Comment comments={comments} />
        {/* <Reply /> */}
      </section>

      <form
        onSubmit={handleSubmit(commentOnSubmit)}
        className='bottom-0 flex items-center gap-3 border-t border-chatListHoverColor px-[17px] py-[16px]'
      >
        <img src={student1} alt='comment user' className='h-[35px]' />
        <div className='relative flex w-full items-center rounded-[15px] bg-commuInputColor p-[14px]'>
          <textarea
            {...register('comment')}
            className='scrollbar-hide h-[30px] w-[300px] resize-none border-none bg-transparent p-0 text-[14px] focus:ring-0'
            placeholder='댓글입력'
            autoComplete='off'
            autoCorrect='off'
            onInput={handleTextareaInput}
          />
          {errors.comment && (
            <p className='text-red-500'>{errors.comment.message}</p>
          )}
          <button
            type='submit'
            className='absolute right-2 rounded bg-blue-500 p-2 text-white'
          >
            올리기
          </button>
        </div>
      </form>
    </section>
  );
};

export default CommentModal;
