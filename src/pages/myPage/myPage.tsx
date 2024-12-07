import { useParams } from 'react-router-dom';
import ProfileHeader from '@/components/myPage/ProfileHeader';
import CommunityInfo from '@/components/myPage/CommunityInfo';
import PostGrid from '@/components/myPage/PostGrid';
import { useProfileGetQuery } from '@/api/myPage/myPage.hooks';
import LoadingPage from '../status/loadingPage';
import ErrorPage from '../status/errorPage';
import NotfoundPage from '../status/notfoundPage';
import { useProfile } from '@/hooks/useProfile';

const MyPage = () => {
  const { userId } = useParams();
  const numberTypeUserId = Number(userId);

  const isOwnProfile = !userId;

  // userId가 있으면 해당 유저의 프로필을, 없으면 내 프로필을 조회
  const { data, isLoading, isError, error, refetch } =
    useProfileGetQuery(numberTypeUserId);

  const { profileData } = useProfile();

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return <ErrorPage error={error as Error} resetError={() => refetch()} />;
  }

  if (!data || !profileData) {
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
    subDescription: data.role === 'student' ? data.description : data.position,
    isOwnProfile,
  };

  const communityInfoProps = {
    role: data.role,
    post_count: data.post_count,
    like_count: data.like_count,
    comment_count: data.comment_count,
  };

  const postGridProps = {
    myRole: profileData?.role,
    userRole: data.role,
    posts: data.posts,
    userId: numberTypeUserId,
    post_count: data.post_count,
    isOwnProfile,
  };

  return (
    <div className='custom-scrollbar h-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
      <div className='flex w-full flex-col items-center gap-9 px-4 py-12'>
        <ProfileHeader {...profileHeaderProps} />

        {isOwnProfile && <CommunityInfo {...communityInfoProps} />}

        <PostGrid {...postGridProps} />
      </div>
    </div>
  );
};

export default MyPage;
