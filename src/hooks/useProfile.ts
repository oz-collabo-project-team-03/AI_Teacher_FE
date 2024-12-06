import { UserInfoContext } from '@/context/UserInfoContextProvider';
import { useContext } from 'react';

export const useProfile = () => {
  const context = useContext(UserInfoContext);

  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
};
