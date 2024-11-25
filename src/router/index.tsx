import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';

import DefaultLayout from '../layouts/defaultLayout';
import StudentLayout from '../layouts/studentLayout';
import TeacherLayout from '../layouts/teacherLayout';

import Landing from '../pages/landing/landing';
import LoadingPage from '../pages/loadingPage';
import MyPost from '@/pages/myPost/myPost';

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
const FindEmailPage = lazy(() => import('../pages/auth/findEmailPage'));
const FindPasswordPage = lazy(() => import('@pages/auth/findPasswordPage'));
const StudentChatListPage = lazy(
  () => import('../pages/chat/studentChatListPage')
);
const StudentChatRoomPage = lazy(
  () => import('../pages/chat/studentChatRoomPage')
);
const TeacherChatListPage = lazy(
  () => import('../pages/chat/teacherChatListPage')
);

const TeacherChatRoomPage = lazy(
  () => import('../pages/chat/teacherChatRoomPage')
);

const CreatePostPage = lazy(() => import('../pages/post/createPostPage'));

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='*' />
          <Route path='/' element={<Landing />} />
          <Route
            path='/login'
            element={
              <Suspense fallback={<LoadingPage />}>
                <LoginPage />
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
          <Route
            path='/find/email'
            element={
              <Suspense fallback={<LoadingPage />}>
                <FindEmailPage />
              </Suspense>
            }
          />
          <Route
            path='/find/password'
            element={
              <Suspense fallback={<LoadingPage />}>
                <FindPasswordPage />
              </Suspense>
            }
          />
          <Route
            path='/student/chats/:chatId'
            element={
              <Suspense fallback={<LoadingPage />}>
                <StudentChatRoomPage />
              </Suspense>
            }
          />
          <Route
            path='/teacher/chats/:chatId'
            element={
              <Suspense fallback={<LoadingPage />}>
                <TeacherChatRoomPage />
              </Suspense>
            }
          />

          <Route
            path='/student/post'
            element={
              <Suspense fallback={<LoadingPage />}>
                <CreatePostPage />
              </Suspense>
            }
          />
          <Route element={<StudentLayout />}>
            {/* 본인의 마이페이지 */}
            <Route
              path='/my-page'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <MyPage />
                </Suspense>
              }
            />
            {/* 다른 사용자의 프로필 페이지 */}
            <Route
              path='/my-page/:userId'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <MyPage />
                </Suspense>
              }
            />
            {/* 본인의 포스트 페이지*/}
            <Route
              path='/my-post'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <MyPost />
                </Suspense>
              }
            />
            {/* 다른 사용자의 포스트 페이지 */}
            <Route
              path='/my-page/:userId'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <MyPage />
                </Suspense>
              }
            />
            <Route
              path='/student-main'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <HomeFeedPage />
                </Suspense>
              }
            />
            <Route
              path='/student/chats'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <StudentChatListPage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<TeacherLayout />}>
            <Route
              path='/teacher-main'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <ManagedStudentListPage />
                </Suspense>
              }
            />
            <Route
              path='/teacher/chats'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <TeacherChatListPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
export default Router;
