import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './pages/error/ErrorBoundary';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import PlatformPage from './pages/public/PlatformPage';

// Payment Pages
import PricingPage from './pages/payment/PricingPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import LabWizard from './pages/dashboard/LabWizard';

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
import AdminWelcomePage from './pages/admin/AdminWelcomePage';
import UserManagementPage from './pages/admin/UserManagementPage';
import ContentManagementPage from './pages/admin/ContentManagementPage';
import LabCreationPage from './pages/admin/LabCreationPage';
import SystemMonitorPage from './pages/admin/SystemMonitorPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import SecurityCenterPage from './pages/admin/SecurityCenterPage';
import AnalyticsDashboardPage from './pages/admin/AnalyticsDashboardPage';
import DatabaseManagementPage from './pages/admin/DatabaseManagementPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';
import DockerManagementPage from './pages/admin/DockerManagementPage';

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
    path: '/platform',
    element: <PlatformPage />,
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
    path: '/dashboard/create',
    element: (
      <ProtectedRoute requiredRole={['admin', 'creator']}>
        <LabWizard />
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
        <AdminWelcomePage />
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
    path: '/admin/settings',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminSettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/security',
    element: (
      <ProtectedRoute requiredRole="admin">
        <SecurityCenterPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AnalyticsDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/database',
    element: (
      <ProtectedRoute requiredRole="admin">
        <DatabaseManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/audit',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AuditLogsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/docker',
    element: (
      <ProtectedRoute requiredRole="admin">
        <DockerManagementPage />
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

