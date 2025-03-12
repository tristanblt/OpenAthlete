import { AuthLayout } from '@/components/layouts';
import { LoadingScreen } from '@/components/loading-screen';
import { GuestGuard } from '@/guards';
import { Suspense, lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { getPath, getPathEnd } from '../paths';

const LoginPage = lazy(() =>
  import('@/pages/auth/login').then((module) => ({
    default: module.LoginPage,
  })),
);

const CreateAccountPage = lazy(() =>
  import('@/pages/auth/create-account').then((module) => ({
    default: module.CreateAccountPage,
  })),
);

export const authRoutes: RouteObject[] = [
  {
    path: getPath(['auth']),
    element: (
      <GuestGuard>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </GuestGuard>
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
      {
        path: getPathEnd(getPath(['auth', 'createAccount'])),
        element: (
          <AuthLayout>
            <CreateAccountPage />
          </AuthLayout>
        ),
      },
    ],
  },
];
