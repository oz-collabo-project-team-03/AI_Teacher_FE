import { Suspense, lazy } from 'react';

import DefaultLayout from '../layouts/defaultLayout';
import ErrorPage from '@/pages/status/errorPage';
import NotfoundPage from '@/pages/status/notfoundPage';
import Landing from '../pages/landing/landing';
import LoadingPage from '../pages/status/loadingPage';

const LoginPage = lazy(() => import('../pages/auth/loginPage'));

const TermsOfServicePage = lazy(
  () => import('../pages/auth/termsOfServicePage')
);
const RoleSelectPage = lazy(() => import('../pages/auth/roleSelectPage'));
const SignupPage = lazy(() => import('../pages/auth/signupPage'));
const SignupCompletePage = lazy(
  () => import('../pages/auth/signupCompletePage')
);
const FindEmailPage = lazy(() => import('../pages/auth/findEmailPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/resetPasswordPage'));

const SocialLoginHandlerPage = lazy(
  () => import('../pages/auth/loginHandlerPage')
);

export const commonRoutes = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '*',
        element: <NotfoundPage />,
      },
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
      {
        path: '/auth/login/callback/kakao',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SocialLoginHandlerPage />
          </Suspense>
        ),
      },
      {
        path: '/auth/login/callback/google',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SocialLoginHandlerPage />
          </Suspense>
        ),
      },
      {
        path: '/auth/login/callback/naver',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SocialLoginHandlerPage />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LoginPage />
          </Suspense>
        ),
      },

      {
        path: '/member-agree',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <TermsOfServicePage />
          </Suspense>
        ),
      },
      {
        path: '/role-selection',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleSelectPage />
          </Suspense>
        ),
      },
      {
        path: '/signup/:role',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: '/signup-complete',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SignupCompletePage />
          </Suspense>
        ),
      },
      {
        path: '/find/email',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <FindEmailPage />
          </Suspense>
        ),
      },
      {
        path: '/reset/password',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ResetPasswordPage />
          </Suspense>
        ),
      },
    ],
  },
];
