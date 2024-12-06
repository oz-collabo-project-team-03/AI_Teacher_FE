import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/status/loadingPage';

const ProtectedRoute = () => {
  const { userId, isInitialized } = useAuth();
  const location = useLocation();
  if (!isInitialized) {
    return <LoadingPage />;
  }

  return userId ? (
    <Outlet />
  ) : null;
  // <Navigate to='/login' state={{ from: location }} replace />
};

export default ProtectedRoute;
