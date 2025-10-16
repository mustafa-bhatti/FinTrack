import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './../components/LandingPage';
import SignUp from './../components/SignUp';
import Dashboard from '../components/Dashboard';
import DataProvider from '../context/dataProvider';
function AppRouter() {
  return (
    <Router>
      <DataProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </DataProvider>
    </Router>
  );
}

export default AppRouter;
