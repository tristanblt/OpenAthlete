import { AuthLayout } from '@/components/layouts/auth.layout';
import { LoadingScreen } from '@/components/loading-screen';
import { Suspense, lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { getPath, getPathEnd } from '../paths';

const LoginPage = lazy(() =>
  import('@/pages/auth/login').then((module) => ({
    default: module.LoginPage,
  })),
);

export const authRoutes: RouteObject[] = [
  {
    path: getPath(['auth']),
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: getPathEnd(getPath(['auth', 'login'])),
        element: (
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        ),
      },
    ],
  },
];
