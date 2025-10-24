<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import SignUp from "../components/SignUp";
import Dashboard from "../components/Dashboard";
import DataProvider from "../context/dataProvider";
import Login from "../components/Login";
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import SignUp from '../components/SignUp';
import Dashboard from '../components/Dashboard';
import DataProvider from '../context/dataProvider';
import Login from '../components/Login';
import TransanctionPage from '../components/TransanctionPage';
>>>>>>> ed8f7d24e866be67f89822ec3df6a651f5573881
function AppRouter() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
<<<<<<< HEAD
          <Route path="/" element={<LandingPage />} />
=======
          <Route
            path="/dashboard/transactions"
            element={<TransanctionPage />}
          />
>>>>>>> ed8f7d24e866be67f89822ec3df6a651f5573881
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default AppRouter;
