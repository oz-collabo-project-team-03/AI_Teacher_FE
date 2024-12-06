import { useEffect } from 'react';
import { useProfileStore } from '@/stores/editProfile/useProfileStore';
import { useParams } from 'react-router-dom';
import ProfileHeader from '@/components/myPage/ProfileHeader';
import CommunityInfo from '@/components/myPage/CommunityInfo';
import PostGrid from '@/components/myPage/PostGrid';
import { useProfileGetQuery } from '@/api/myPage/myPage.hooks';
import LoadingPage from '../status/loadingPage';
import ErrorPage from '../status/errorPage';
import NotfoundPage from '../status/notfoundPage';

const MyPage = () => {
  const { userId } = useParams();
  const { setUserInfo } = useProfileStore();

  const isOwnProfile = !userId;

  // userId가 있으면 해당 유저의 프로필을, 없으면 내 프로필을 조회
  const { data, isLoading, isError, error, refetch } =
    useProfileGetQuery(userId);

  //* 현재는 임시로 스토어 사용
  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data]);

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  if (!data) {
    return <NotfoundPage />;
  }

  const profileHeaderProps = {
    role: data.role,
    profileImage: data.profile_image,
    nickname: data.nickname,
    description:
      data.role === 'student'
        ? `${data.career_aspiration}, ${data.interest}`
        : `${data.organization_type}, ${data.organization_name}`,
    subDescription:
      data.role === 'student' ? data.description : data.organization_position,
    isOwnProfile,
  };

  const postGridProps = {
    posts: data.posts,
    title: data.role === 'student' ? '게시글' : '협업 게시글',
    userId,
    post_count: data.post_count,
    isOwnProfile,
  };

  return (
    <div className='m-auto flex w-full flex-col items-center gap-9 px-4 pb-20 pt-12'>
      <ProfileHeader {...profileHeaderProps} />

      {isOwnProfile && <CommunityInfo userInfo={data} />}

      <PostGrid {...postGridProps} />
    </div>
  );
};

export default MyPage;
