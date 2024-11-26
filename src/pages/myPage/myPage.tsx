import { useEffect } from 'react';
import { useProfileStore } from '@/stores/editProfile/useProfileStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import ProfileHeader from '@/components/myPage/ProfileHeader';
import CommunityInfo from '@/components/myPage/CommunityInfo';
import PostGrid from '@/components/myPage/PostGrid';
import { useProfileGetQuery } from '@/api/myPage/myPage.hooks';
import { AxiosError } from 'axios';

const MyPage = () => {
  const { userId } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useProfileStore();

  // userId가 있으면 해당 유저의 프로필을, 없으면 내 프로필을 조회
  const { data, error } = useProfileGetQuery(userId);
  const isOwnProfile = !userId;
  const profileData = isOwnProfile ? userInfo : data;

  useEffect(() => {
    if (data && !userInfo && isOwnProfile) {
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
  }, [data, error, isOwnProfile, userInfo]);

  if (!profileData) {
    return null;
  }

  return (
    <div className='m-auto flex w-full max-w-[360px] flex-col items-center gap-9 py-12'>
      <ProfileHeader
        profileImage={profileData.profile_image}
        nickname={profileData.nickname}
        description={
          profileData.role === 'student'
            ? `${profileData.career_aspiration}, ${profileData.interest}`
            : `${profileData.organization_type}, ${profileData.organization_name}`
        }
        subDescription={
          profileData.role === 'student'
            ? profileData.description
            : profileData.organization_position
        }
        isOwnProfile={isOwnProfile}
      />

      <CommunityInfo userInfo={profileData} />

      <PostGrid
        posts={profileData.posts}
        title={profileData.role === 'student' ? '내 게시글' : '협업 게시글'}
        userId={userId}
      />
    </div>
  );
};

export default MyPage;
