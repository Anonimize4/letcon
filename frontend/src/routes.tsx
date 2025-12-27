import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './pages/error/ErrorBoundary';

// Public Pages
import HomePage from './pages/public/HomePage';
import PricingPage from './pages/public/PricingPage';
import AboutPage from './pages/public/AboutPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';

// Learning Pages
import LearningPathsPage from './pages/learning/LearningPathsPage';
import PathDetailPage from './pages/learning/PathDetailPage';
import ModulePage from './pages/learning/ModulePage';
import LabPage from './pages/learning/LabPage';

// Challenge Pages
import ChallengesPage from './pages/challenges/ChallengesPage';
import ChallengeDetailPage from './pages/challenges/ChallengeDetailPage';
import CTFArenaPage from './pages/challenges/CTFArenaPage';

// Community Pages
import ForumPage from './pages/community/ForumPage';
import WriteUpsPage from './pages/community/WriteUpsPage';
import LeaderboardPage from './pages/community/LeaderboardPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagementPage from './pages/admin/UserManagementPage';
import ContentManagementPage from './pages/admin/ContentManagementPage';
import LabCreationPage from './pages/admin/LabCreationPage';
import SystemMonitorPage from './pages/admin/SystemMonitorPage';

// Error Pages
import NotFoundPage from './pages/error/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/learning',
    element: (
      <ProtectedRoute>
        <LearningPathsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/learning/paths/:pathId',
    element: (
      <ProtectedRoute>
        <PathDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/learning/modules/:moduleId',
    element: (
      <ProtectedRoute>
        <ModulePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/learning/labs/:labId',
    element: (
      <ProtectedRoute>
        <LabPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/challenges',
    element: (
      <ProtectedRoute>
        <ChallengesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/challenges/:challengeId',
    element: (
      <ProtectedRoute>
        <ChallengeDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/ctf',
    element: (
      <ProtectedRoute>
        <CTFArenaPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/community/forum',
    element: (
      <ProtectedRoute>
        <ForumPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/community/writeups',
    element: (
      <ProtectedRoute>
        <WriteUpsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/community/leaderboard',
    element: (
      <ProtectedRoute>
        <LeaderboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute requiredRole="admin">
        <UserManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/content',
    element: (
      <ProtectedRoute requiredRole="admin">
        <ContentManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/labs/create',
    element: (
      <ProtectedRoute requiredRole="admin">
        <LabCreationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/monitor',
    element: (
      <ProtectedRoute requiredRole="admin">
        <SystemMonitorPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
