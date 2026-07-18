import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../components/shared/ProtectedRoute';
import Layout from '../components/layout/Layout';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Analyze from '../pages/Analyze';
import Reports from '../pages/Reports';
import History from '../pages/History';
import Settings from '../pages/Settings';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // Protected routes (require authentication)
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
          {
            path: '/analyze',
            element: <Analyze />,
          },
          {
            path: '/reports',
            element: <Reports />,
          },
          {
            path: '/history',
            element: <History />,
          },
          {
            path: '/settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);