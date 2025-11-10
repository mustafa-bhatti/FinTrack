import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useContext(AuthContext);
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}
