import { useProfileGetQuery } from '@/api/myPage/myPage.hooks';
import { MyPageResponseDto } from '@/types/myPageType';
import { ReactNode, createContext, useContext } from 'react';

type UserInfoConTextType = {
  profileData?: MyPageResponseDto;
  isLoading: boolean;
  isError: boolean;
  error?: any;
  refetchProfile: () => void;
};

export const UserInfoContext = createContext<UserInfoConTextType | undefined>(
  undefined
);

export const UserInfoProvider = ({
  userId,
  children,
}: {
  userId: number;
  children: ReactNode;
}) => {
  const {
    data: profileData,
    isLoading,
    isError,
    error,
    refetch: refetchProfile,
  } = useProfileGetQuery(userId);

  const value = {
    profileData,
    isLoading,
    isError,
    error,
    refetchProfile,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(UserInfoContext);

  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
};
