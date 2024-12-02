import { useFormContext } from 'react-hook-form';

const PostTextEditor = () => {
  const { register } = useFormContext();

  return (
    <div className='bx-[16px] by-[12px] flex h-[345px] items-center justify-center'>
      <div className='mx-[12px] my-[8px] h-[320px] w-full'>
        <textarea
          {...register('content')}
          className='h-full w-full resize-none overflow-auto rounded-[6px] border-0 text-[14px] outline-none ring-1 ring-inset ring-postTextBorderColor focus:ring-2 focus:ring-inset focus:ring-inputFocusColor'
          placeholder='내용을 작성해주세요 (300자 이내)'
          maxLength={300}
        />
      </div>
    </div>
  );
};

export default PostTextEditor;
