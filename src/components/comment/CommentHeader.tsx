const CommentHeader = () => {
  return (
    <header className='shadow-commentShadow mt-[50px] rounded-t-[15px]'>
      <div className='flex h-[59px] flex-col items-center justify-center gap-1.5 border-b border-chatListHoverColor'>
        <div className='h-[8px] w-[56px] rounded-full bg-unFocusColor'></div>
        <p className='text-[16px] font-medium'>댓글</p>
      </div>
    </header>
  );
};

export default CommentHeader;
