import App from '@/App';
import RootLayout from '@/layout/RootLayout';
import AppDevelopmentTestPage from '@/pages/app-development-test/AppDevelopmentTest';
import LogicTestPage from '@/pages/LogicTest';
import NotFoundPage from '@/pages/NotFound';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'logic-test',
        element: <LogicTestPage />,
      },
      {
        path: 'app-development-test',
        element: <AppDevelopmentTestPage />,
      },
    ],
  },
]);

export default router;
