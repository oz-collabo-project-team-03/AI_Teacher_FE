import { useEffect, useState } from 'react';
import {
  StudentMyPageResponse,
  TeacherMyPageResponse,
} from '../../types/myPageType.ts';
import StudentPage from '../../components/myPage/StudentPage.tsx';
import TeacherPage from '../../components/myPage/TeacherPage.tsx';
import { useProfileStore } from '../../stores/editProfile/useProfileStore.ts';

const MyPage = () => {
  const { userInfo, setUserInfo } = useProfileStore();
  const [communityInfo, setCommunityInfo] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userInfo) {
        try {
          const response = await fetch('/api/profile/me');
          const result = await response.json();

          if (result.success) {
            setUserInfo(result.data);
          }
        } catch (error) {
          console.error(
            '프로필 데이터를 불러오는 중 오류가 발생했습니다:',
            error
          );
        }
      }
    };

    fetchProfileData();
  }, [userInfo, setUserInfo]);

  useEffect(() => {
    if (userInfo) {
      setCommunityInfo(
        userInfo.role === 'student'
          ? [
              { label: '게시글', value: userInfo.post_count },
              { label: '좋아요', value: userInfo.like_count },
              { label: '작성 댓글', value: userInfo.comment_count },
            ]
          : [
              { label: '협업 게시글', value: userInfo.post_count },
              { label: '좋아요', value: userInfo.like_count },
              { label: '작성 댓글', value: userInfo.comment_count },
            ]
      );
    }
  }, [userInfo]);

  if (!userInfo) {
    return null;
  }

  return (
    <div className='m-auto flex w-full max-w-[360px] flex-col items-center gap-9 py-12'>
      {userInfo.role === 'student' ? (
        <StudentPage
          userInfo={userInfo as StudentMyPageResponse}
          communityInfo={communityInfo}
        />
      ) : (
        <TeacherPage
          userInfo={userInfo as TeacherMyPageResponse}
          communityInfo={communityInfo}
        />
      )}
    </div>
  );
};

export default MyPage;
