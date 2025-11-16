import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import SignUp from '../components/SignUp';
import Dashboard from '../components/Dashboard';
import DataProvider from '../context/dataProvider';
import Login from '../components/Login';
import TransactionPage from '../components/TransactionPage';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Balance from '../components/Balance';
import Settings from '../components/Settings';
import AdminProtectedRoute from '../components/AdminRoute';
import Admin from '../components/Admin';
function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <DataProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LogIn" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/LandingPage" element={<LandingPage />} />
            <Route
              path="/dashboard/transactions"
              element={
                <ProtectedRoute>
                  <TransactionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/balance"
              element={
                <ProtectedRoute>
                  <Balance />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
                </div>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/reports"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-3xl font-bold">
                      Reports Page Coming Soon!
                    </h1>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <AdminProtectedRoute>
                  <Admin />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </DataProvider>
      </Router>
    </AuthProvider>
  );
}

export default AppRouter;
