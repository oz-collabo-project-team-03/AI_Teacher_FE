import { Route, Routes } from 'react-router';
import { Suspense, lazy } from 'react';

import DefaultLayout from '../layouts/defaultLayout';
import LandingPage from '../pages/landing/landingPage';
import LoadingPage from '../pages/loadingPage';
import StudentLayout from '../layouts/studentLayout';
import TeacherLayout from '../layouts/teacherLayout';

const HomeFeedPage = lazy(() => import('../pages/main/homeFeedPage'));
const ManagedStudentListPage = lazy(
  () => import('../pages/main/managedStudentListPage')
);
const LoginPage = lazy(() => import('../pages/auth/loginPage'));
const MyPage = lazy(() => import('../pages/myPage/myPage'));
const EditProfile = lazy(() => import('../pages/editProfile/editProfile'));
const ChangeProfile = lazy(
  () => import('../pages/changeProfile/changeProfile')
);
const TermsOfServicePage = lazy(
  () => import('../pages/auth/termsOfServicePage')
);
const RoleSelectPage = lazy(() => import('../pages/auth/roleSelectPage'));
const SignupPage = lazy(() => import('../pages/auth/signupPage'));
const SignupCompletePage = lazy(
  () => import('../pages/auth/signupCompletePage')
);

// import StudentChatListPage from '../pages/chat/studentChatListPage';

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='*' />
          <Route path='/' element={<LandingPage />} />
          <Route
            path='/login'
            element={
              <Suspense fallback={<LoadingPage />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path='/my-page'
            element={
              <Suspense fallback={<LoadingPage />}>
                <MyPage />
              </Suspense>
            }
          />
          <Route
            path='/edit-profile'
            element={
              <Suspense fallback={<LoadingPage />}>
                <EditProfile />
              </Suspense>
            }
          />
          <Route
            path='/change-profile'
            element={
              <Suspense fallback={<LoadingPage />}>
                <ChangeProfile />
              </Suspense>
            }
          />
          <Route
            path='/member-agree'
            element={
              <Suspense fallback={<LoadingPage />}>
                <TermsOfServicePage />
              </Suspense>
            }
          />
          <Route
            path='/role-selection'
            element={
              <Suspense fallback={<LoadingPage />}>
                <RoleSelectPage />
              </Suspense>
            }
          />
          <Route
            path='/signup/:role'
            element={
              <Suspense fallback={<LoadingPage />}>
                <SignupPage />
              </Suspense>
            }
          />
          <Route
            path='/signup-complete'
            element={
              <Suspense fallback={<LoadingPage />}>
                <SignupCompletePage />
              </Suspense>
            }
          />
        </Route>
        <Route element={<StudentLayout />}>
          {/* <Route path='/chat' element={<StudentChatListPage />} /> */}
          <Route
            path='/student-main'
            element={
              <Suspense fallback={<LoadingPage />}>
                <HomeFeedPage />
              </Suspense>
            }
          />
        </Route>
        <Route element={<TeacherLayout />}>
          {/* <Route path='/chat1' element={<TeacherChatListPage />} /> */}
          <Route
            path='/teacher-main'
            element={
              <Suspense fallback={<LoadingPage />}>
                <ManagedStudentListPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
export default Router;
