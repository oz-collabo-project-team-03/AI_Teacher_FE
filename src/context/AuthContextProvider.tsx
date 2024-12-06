import { createContext, useState, ReactNode, useEffect } from 'react';
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
    if (accessToken) {
      // 로딩 중이면 대기
      if (isLoading) return;

      // 토큰이 있고 쿼리 결과가 있으면
      if (userInfo) {
        setUserId(userInfo.id);
        setIsInitialized(true);
      } else if (isError) {
        // 토큰이 유효하지 않은 경우
        logout();
        setIsInitialized(true);
      }
    } else {
      // 토큰이 없으면 바로 초기화
      setUserId(null);
      setIsInitialized(true);
    }
  }, [userInfo, isError, isLoading, accessToken]);

  const login = (newUserId: number) => {
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId.toString());
  };

  const logout = () => {
    setUserId(null);
    // 로그아웃 시 localStorage에서 제거
    localStorage.removeItem('userId');
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
