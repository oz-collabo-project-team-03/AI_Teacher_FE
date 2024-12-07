import { RouterProvider } from 'react-router';

import { AuthProvider } from '@/context/AuthContextProvider';
import { commonRoutes } from './commonRoutes';
import { createBrowserRouter } from 'react-router-dom';
import { loggedRoutes } from './loggedRoutes';

const Router = () => {
  const router = createBrowserRouter([
    ...commonRoutes, // 먼저 공통 라우트
    ...loggedRoutes, // 그 다음 로그인된 라우트
  ]);

  return (
    <AuthProvider>
      {/* 리액트 라우터가 v7 업데이트 하면서 방식 바뀔거라고 경고띄우는게
      콘솔에서 보기싫어서 설정했습니다 */}
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthProvider>
  );
};
export default Router;
