import { DashboardLayout } from '@/components/layouts';
import { LoadingScreen } from '@/components/loading-screen';
import { AuthGuard } from '@/guards';
import { Suspense, lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { getPath } from '../paths';

const IndexPage = lazy(() =>
  import('@/pages/dashboard').then((module) => ({
    default: module.DashboardPage,
  })),
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: getPath(['dashboard']),
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [{ element: <IndexPage />, index: true }],
  },
];
