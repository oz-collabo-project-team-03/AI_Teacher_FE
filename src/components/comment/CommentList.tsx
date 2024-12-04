import { Comment } from '@/api/comment/fetchComment/fetchCommentType';
import student1 from '../../assets/editProfile/student/studentIcon2.png';
import { useDeleteCommentMutation } from '@/api/comment/deleteComment/deleteComment.hooks';

type CommentProps = {
  comments: Comment[];
  refetchComments: () => void;
};

const CommentList = ({ comments, refetchComments }: CommentProps) => {
  console.log('댓글리스트 확인', comments);

  const { mutate: deleteComment, status } = useDeleteCommentMutation({
    onSuccess: (data) => {
      console.log(data.message);
      refetchComments(); //댓글 삭제 후 댓글 목록 갱신
    },
    onError: () => {
      console.log('삭제실패');
    },
  });

  const handleDeleteClick = (comment_id: number) => {
    const confirmation = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (confirmation) {
      deleteComment({ comment_id }); // 삭제 요청
    }
  };

  return (
    <section className='flex h-full flex-col'>
      {comments.length === 0 ? (
        <div className='flex h-full flex-col items-center justify-center'>
          <p className='text-[20px] font-bold'>아직 댓글이 없습니다. </p>
          <p className=''>댓글을 남겨주세요.</p>
        </div>
      ) : (
        comments.map((comment, index) => (
          <article key={comment.comment_id} className='mb-[20px]'>
            <div className='flex gap-2'>
              <img
                src={comment.profile_image || student1}
                alt='comment user'
                className='h-[30px] w-[30px] rounded-full'
              />
              <div className='w-full'>
                <p className='text-[16px] font-semibold'>
                  {comment.author_nickname}
                </p>
                <div
                  key={index}
                  className='whitespace-normal break-words text-[14px]'
                >
                  {comment.content}
                </div>
                <button className='mr-[5px] text-[12px] text-captionColor hover:text-repleText'>
                  답글
                </button>
                <button
                  className='text-[12px] text-captionColor hover:text-repleText'
                  onClick={() => handleDeleteClick(comment.comment_id)} // 삭제 클릭 시 호출
                  disabled={status === 'pending'} // 삭제 중에는 버튼 비활성화
                >
                  삭제
                </button>
              </div>
            </div>
          </article>
        ))
      )}
    </section>
  );
};

export default CommentList;
