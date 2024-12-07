import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/status/loadingPage';

const ProtectedRoute = () => {
  const { userId, isInitialized, isLoggedIn } = useAuth();
  const location = useLocation();

  console.log('Protected Route Debug:', {
    userId,
    isInitialized,
    isLoggedIn,
    pathname: location.pathname,
  });

  if (!isInitialized) {
    return <LoadingPage />;
  }

  // 명시적으로 로그인 상태와 userId 체크
  if (!userId) {
    console.warn('Redirecting to login:', location.pathname);
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
