import student1 from '../../assets/editProfile/student/studentIcon2.png';

type CommentProps = {
  comments: string[];
};

const Comment = ({ comments }: CommentProps) => {
  return (
    <section>
      {comments.length === 0 ? (
        <div className='flex flex-col'>
          <p className=''>아직 댓글이 없습니다. </p>
          <p className=''>댓글을 남겨주세요.</p>
        </div>
      ) : (
        comments.map((comment, index) => (
          <article key={index} className='mb-[20px]'>
            <div className='flex gap-2'>
              <img
                src={student1}
                alt='comment user'
                className='h-[30px] w-[30px] rounded-full'
              />
              <div className='w-full'>
                <p className='text-[16px]'>대기고쌤</p>
                <div
                  key={index}
                  className='whitespace-normal break-words text-[14px]'
                >
                  {comment}
                </div>
                <button className='text-[12px] text-captionColor'>
                  답글 달기
                </button>
              </div>
            </div>
          </article>
        ))
      )}
    </section>
  );
};

export default Comment;
