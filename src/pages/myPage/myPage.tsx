import { useEffect } from 'react';
import { useProfileStore } from '@/stores/editProfile/useProfileStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import ProfileHeader from '@/components/myPage/ProfileHeader';
import CommunityInfo from '@/components/myPage/CommunityInfo';
import PostGrid from '@/components/myPage/PostGrid';
import { useProfileQuery } from '@/api/myPage/myPage.hooks';
import { AxiosError } from 'axios';

const MyPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useProfileStore();
  const { data, error } = useProfileQuery();

  useEffect(() => {
    if (data && !userInfo) {
      setUserInfo(data);
    }
    if (error instanceof AxiosError) {
      const message =
        error.response?.status === 401
          ? '로그인 후 이용바랍니다.'
          : '프로필 정보를 불러오는데 실패했습니다.';
      showToast(message);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  }, [data, error]);

  if (!userInfo) {
    return null;
  }

  return (
    <div className='m-auto flex w-full max-w-[360px] flex-col items-center gap-9 py-12'>
      <ProfileHeader
        profileImage={userInfo.profile_image}
        nickname={userInfo.nickname}
        description={
          userInfo.role === 'student'
            ? `${userInfo.career_aspiration}, ${userInfo.interest}`
            : `${userInfo.organization_type}, ${userInfo.organization_name}`
        }
        subDescription={
          userInfo.role === 'student'
            ? userInfo.description
            : userInfo.organization_position
        }
      />

      <CommunityInfo userInfo={userInfo} />

      <PostGrid
        posts={userInfo.posts}
        title={userInfo.role === 'student' ? '내 게시글' : '협업 게시글'}
      />
    </div>
  );
};

export default MyPage;
