import { ReactNode, createContext, useEffect, useState } from 'react';

import { Cookies } from 'react-cookie';
import { useProfileGetQuery } from '@/api/myPage/myPage.hooks';

// 인증 컨텍스트 타입 정의
type AuthContextType = {
  userId: number | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  login: (userId: number) => void;
  logout: () => void;
};

// 컨텍스트 생성
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// 인증 프로바이더 컴포넌트
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // 초기화 상태 추적

  const cookies = new Cookies();

  // 사용자 정보 쿼리
  const { data: userInfo, isError, isLoading } = useProfileGetQuery();

  const accessToken = cookies.get('accessToken');
  // 초기 로그인 상태 체크 (토큰 존재 여부)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (accessToken) {
          if (!isLoading) {
            if (userInfo) {
              setUserId(userInfo.id);
            } else if (isError) {
              // 토큰 검증 실패 시 명시적 로그아웃
              logout();
            }

            // 이 부분에서 항상 초기화되도록 수정
            setIsInitialized(true);
          }
        } else {
          setUserId(null);
          setIsInitialized(true);
        }
      } catch (error) {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [accessToken, userInfo, isError, isLoading]);

  const login = (newUserId: number) => {
    setUserId(newUserId);
    // localStorage.setItem('userId', newUserId.toString());
  };

  const logout = () => {
    setUserId(null);
    cookies.remove('accessToken');
  };

  const value = {
    userId,
    isLoggedIn: !!userId,
    isInitialized,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
