import FeedPostButton from '@/components/main/FeedPostButton';
import { Link } from 'react-router-dom';
import teacherIcon1 from '@/assets/editProfile/teacher/teacherIcon1.png';
import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useProfile } from '@/hooks/useProfile';

type FeedPostContentProps = {
  like_count: number;
  comment_count: number;
  content: string;
  teacher?: {
    user_id: number;
    nickname: string;
    profile_image: string;
  };
  created_at: string;
  post_id: string;
};

const FeedPostContent = ({
  like_count,
  // comment_count,
  content,
  teacher,
  created_at,
  post_id,
}: FeedPostContentProps) => {
  const { profileData } = useProfile();
  // const localStorageId = Number(localStorage.getItem('userId'));

  // 텍스트 확장 상태
  const [isExpanded, setIsExpanded] = useState(false);
  // 텍스트 잘림 상태
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  // 텍스트 요소에 대한 참조
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // 텍스트 잘림 상태를 체크
    const checkTruncation = () => {
      if (textRef.current) {
        // 실제 스크롤 너비가 클라이언트 너비보다 크면 텍스트가 잘린 것
        setIsTextTruncated(
          textRef.current.scrollWidth > textRef.current.clientWidth
        );
      }
    };

    // 초기 체크 실행
    checkTruncation();
    // 창 크기 변경 시 다시 체크
    window.addEventListener('resize', checkTruncation);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', checkTruncation);
  }, [content]); // content가 변경될 때마다 실행

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear().toString().slice(2)}년 ${(date.getMonth() + 1).toString().padStart(2, '0')}월 ${date.getDate().toString().padStart(2, '0')}일`;
  };

  const getMyPagePath = () => {
    if (teacher?.user_id === profileData?.id) {
      return profileData?.role === 'student' ? '/my-page' : '/teacher/my-page';
    }
    return profileData?.role === 'student'
      ? `/my-page/${teacher?.user_id}`
      : `/teacher/my-page/${teacher?.user_id}`;
  };

  return (
    <ul className='flex flex-col items-start px-[12px] font-medium'>
      <FeedPostButton
        like_count={like_count}
        // comment_count={comment_count}
        post_id={post_id}
      />

      {teacher && (
        <li className='mt-2 flex w-full items-center gap-2 text-[15px]'>
          <Link to={getMyPagePath()}>
            <img
              src={teacher.profile_image || teacherIcon1}
              onError={(e) => {
                e.currentTarget.src = teacherIcon1;
              }}
              alt='teacherProfileImage'
              className='h-[20px] w-[20px]'
            />
          </Link>
          <span className='text-textMainColor'>
            {teacher.nickname} 선생님과 협업하였습니다.
          </span>
        </li>
      )}

      <li className='mt-2 flex w-full flex-row items-start'>
        <p
          ref={textRef}
          className={twMerge(
            'text-textMainColor',
            // 확장되지 않은 상태일 때는 너비를 제한하고 말줄임표 표시
            !isExpanded ? 'w-[calc(100%-50px)] truncate' : 'w-full'
          )}
        >
          {content}
        </p>

        {/* 더보기 버튼 (텍스트가 잘리고 확장되지 않은 상태일 때만 표시) */}
        {!isExpanded && isTextTruncated && (
          <button
            onClick={() => setIsExpanded(true)}
            className='ml-3 flex-shrink-0 text-[14px] font-normal text-captionColor'
          >
            더보기
          </button>
        )}
      </li>

      <time
        dateTime='2024-10-15'
        className='mt-1 text-[14px] font-light text-captionColor/70'
      >
        {formatDate(created_at)}
      </time>
    </ul>
  );
};

export default FeedPostContent;
