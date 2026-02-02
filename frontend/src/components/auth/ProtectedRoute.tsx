import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-htb-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-htb-cyan"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if requiredRole is specified
  if (requiredRole && user?.role) {
    const hasAccess = checkRoleAccess(user.role, requiredRole);
    
    if (!hasAccess) {
      // Redirect to dashboard if user doesn't have required role
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

// Helper function to check role hierarchy
// Higher roles have access to lower role routes
// Supports both single role and array of roles
function checkRoleAccess(userRole: string, requiredRole: string | string[]): boolean {
  const roleHierarchy: Record<string, number> = {
    'user': 1,
    'creator': 2,
    'pro': 2,
    'admin': 3,
  };

  const userRoleLevel = roleHierarchy[userRole.toLowerCase()] || 0;

  // Handle both single role and array of roles
  if (Array.isArray(requiredRole)) {
    // User has access if they meet any of the required roles
    return requiredRole.some(role => {
      const roleLevel = roleHierarchy[role.toLowerCase()] || 0;
      return userRoleLevel >= roleLevel;
    });
  } else {
    // Single role check
    const requiredRoleLevel = roleHierarchy[requiredRole.toLowerCase()] || 0;
    return userRoleLevel >= requiredRoleLevel;
  }
}
