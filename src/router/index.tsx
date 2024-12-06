import { AuthProvider } from '@/context/AuthContextProvider';
import { RouterProvider, Routes } from 'react-router';
import { loggedRoutes } from './loggedRoutes';
import { createBrowserRouter } from 'react-router-dom';
import { commonRoutes } from './commonRoutes';

const Router = () => {
  const router = createBrowserRouter([
    ...commonRoutes, // 먼저 공통 라우트
    ...loggedRoutes, // 그 다음 로그인된 라우트
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
export default Router;
