import FeedPostButton from '../../components/main/FeedPostButton';
import teacher from '../../assets/editProfile/teacher/teacherDefaultIcon.png';

const FeedPostContent = () => {
  return (
    <ul className='h-[102px] w-full px-[12px] py-[7px] font-medium'>
      <FeedPostButton />
      {/* 협업멘트 */}
      <li className='mt-[6px] flex h-[20px] w-full items-center text-[14px]'>
        <img
          src={teacher}
          alt='teacherProfileImage'
          className='mr-[5px] h-[20px] w-[20px]'
        />
        <span>도인핑 선생님과 협업하였습니다.</span>
      </li>

      {/* 댓글축약 */}
      <li className='my-[7px] flex h-[14px] w-full'>
        <p className='mr-[6px] text-[14px]'>
          이번에 수학 수업 수행평가 해봤습니다 ㅎㅎ ...
        </p>
        <button className='text-[14px] text-captionColor'>더보기</button>
      </li>
      <time
        dateTime='2024-10-15'
        className='block w-full text-[14px] text-captionColor'
      >
        24년 10월 15일
      </time>
    </ul>
  );
};

export default FeedPostContent;
