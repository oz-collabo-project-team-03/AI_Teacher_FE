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
  const { data, isLoading, error } = useProfileGetQuery(userId);
  const isOwnProfile = !userId;
  const profileData = isOwnProfile ? userInfo || data : data;

  useEffect(() => {
    if (data && isOwnProfile) {
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
  }, [data, error, isOwnProfile]);

  if (isLoading) return <div>로딩 중...</div>;

  if (!data || !profileData) {
    return <div>데이터가 없습니다.</div>;
  }

  const profileHeaderProps = {
    profileImage: profileData.profile_image,
    nickname: profileData.nickname,
    description:
      profileData.role === 'student'
        ? `${profileData.career_aspiration}, ${profileData.interest}`
        : `${profileData.organization_type}, ${profileData.organization_name}`,
    subDescription:
      profileData.role === 'student'
        ? profileData.description
        : profileData.organization_position,
    isOwnProfile,
  };

  const postGridProps = {
    posts: profileData.posts,
    title: profileData.role === 'student' ? '게시글' : '협업 게시글',
    userId,
    post_count: profileData.post_count,
    isOwnProfile,
  };

  return (
    <div className='flex flex-col items-center w-full px-4 pt-12 pb-20 m-auto gap-9'>
      <ProfileHeader {...profileHeaderProps} />

      {isOwnProfile && <CommunityInfo userInfo={profileData} />}

      <PostGrid {...postGridProps} />
    </div>
  );
};

export default MyPage;
