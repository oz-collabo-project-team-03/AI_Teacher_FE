import { Suspense, lazy } from 'react';

import DefaultLayout from '@/layouts/defaultLayout';
import LoadingPage from '../pages/status/loadingPage';
import ProtectedRoute from './protectedRoute';
import StudentLayout from '../layouts/studentLayout';
import TeacherLayout from '../layouts/teacherLayout';

const HomeFeedPage = lazy(() => import('../pages/main/homeFeedPage'));
const ManagedStudentListPage = lazy(
  () => import('../pages/main/managedStudentListPage')
);
const MyPage = lazy(() => import('../pages/myPage/myPage'));
const PostDetail = lazy(() => import('../pages/postDetail/postDetail'));
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
const CreatePostPage = lazy(() => import('../pages/posting/createPostPage'));
const EditProfile = lazy(() => import('../pages/editProfile/editProfile'));
const ChangeProfile = lazy(
  () => import('../pages/changeProfile/changeProfile')
);

export const loggedRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: '/edit-profile',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <EditProfile />
              </Suspense>
            ),
          },
          {
            path: '/change-profile',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <ChangeProfile />
              </Suspense>
            ),
          },
          {
            path: '/student/chats/:roomId',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <StudentChatRoomPage />
              </Suspense>
            ),
          },
          {
            path: '/teacher/chats/:roomId',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <TeacherChatRoomPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <StudentLayout />,
        children: [
          {
            // 본인 마이페이지
            path: '/my-page',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <MyPage />
              </Suspense>
            ),
          },
          {
            //다른 사용자의 프로필 페이지
            path: '/my-page/:userId',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <MyPage />
              </Suspense>
            ),
          },
          {
            //본인의 게시글 상세 페이지
            path: '/posts',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <PostDetail />
              </Suspense>
            ),
          },
          {
            //다른 사용자의 게시글 상세 페이지
            path: '/posts/:userId',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <PostDetail />
              </Suspense>
            ),
          },
          {
            path: '/student-main',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <HomeFeedPage />
              </Suspense>
            ),
          },
          {
            path: '/student/chats',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <StudentChatListPage />
              </Suspense>
            ),
          },
          {
            path: '/student/post',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <CreatePostPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <TeacherLayout />,
        children: [
          {
            path: '/teacher-home',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <HomeFeedPage />
              </Suspense>
            ),
          },
          {
            path: '/teacher-main',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <ManagedStudentListPage />
              </Suspense>
            ),
          },
          {
            path: '/teacher/chats',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <TeacherChatListPage />
              </Suspense>
            ),
          },
          {
            //본인의 마이페이지
            path: '/teacher/my-page',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <MyPage />
              </Suspense>
            ),
          },
          {
            //다른 사용자의 프로필 페이지
            path: '/teacher/my-page/:userId',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <MyPage />
              </Suspense>
            ),
          },
          {
            //본인의 게시글 상세 페이지
            path: '/teacher/posts',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <PostDetail />
              </Suspense>
            ),
          },
          {
            //다른 사용자의 게시글 상세 페이지
            path: '/teacher/posts/:userId',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <PostDetail />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];
