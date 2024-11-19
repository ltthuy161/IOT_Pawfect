import { Suspense, lazy } from 'react';
import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';

import paths, { rootPaths } from './paths';

import PageLoader from '../components/loading/PageLoader';
import Splash from '../components/loading/Splash';

const App = lazy(() => import('../App'));
const MainLayout = lazy(async () => {
  return Promise.all([
    import('../layouts/main-layout'),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});
const AuthLayout = lazy(async () => {
  return Promise.all([
    import('../layouts/auth-layout'),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});

const Error404 = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return import('../pages/errors/Error404');
});

const Sales = lazy(async () => {
  return Promise.all([
    import('../pages/home/Sales'),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const LiveFeed = lazy(async () => {
  return Promise.all([
    import('../pages/home/LiveFeed'),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const ActivityLog = lazy(async () => {
  return Promise.all([
    import('../pages/home/ActivityLog'),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const Login = lazy(async () => import('../pages/authentication/Login'));
const SignUp = lazy(async () => import('../pages/authentication/SignUp'));

const routes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: rootPaths.homeRoot,
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.home,
            element: <Sales />,
          },
          {
            path: paths.livefeed,
            element: <LiveFeed />,
          },
          {
            path: paths.activitylog,
            element: <ActivityLog />,
          }
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <AuthLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: paths.login,
            element: <Login />,
          },
          {
            path: paths.signup,
            element: <SignUp />,
          },
        ],
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '' });

export default router;
