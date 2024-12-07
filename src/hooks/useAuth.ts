import { AuthContext } from '@/context/AuthContextProvider';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // 디버그 로그 추가
  console.log('Auth Context:', {
    userId: context.userId,
    isLoggedIn: context.isLoggedIn,
    isInitialized: context.isInitialized,
  });

  return context;
};
