import { Navigate, Outlet, useLocation } from 'react-router-dom';

import LoadingPage from '@/pages/status/loadingPage';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = () => {
  const { userId, isInitialized } = useAuth();
  const location = useLocation();

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
