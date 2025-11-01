import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import SignUp from '../components/SignUp';
import Dashboard from '../components/Dashboard';
import DataProvider from '../context/dataProvider';
import Login from '../components/Login';
import TransactionPage from '../components/TransactionPage';
import { AuthProvider } from '../context/AuthContext';
function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <DataProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard/transactions"
              element={<TransactionPage />}
            />
          </Routes>
        </DataProvider>
      </Router>
    </AuthProvider>
  );
}

export default AppRouter;
