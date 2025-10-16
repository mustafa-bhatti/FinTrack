import { useState } from "react";

import './App.css';
import Summary from './components/Summary';
import Dashboard from './components/Dashboard';
import DataProvider from './context/dataProvider';

import "./App.css";
import userData from "./data/user1.json";
// import Routes from "react-router-dom";
import Router from "./Routes.jsx/AppRouter";
function App() {
  return (
    // <>
    //   <DataProvider>
    //     <Dashboard />
    //   </DataProvider>
    // </>
    // <div className="app grid grid-cols-5 grid-rows-5">
    //   <div className="col-span-full bg-gray-700 text-white p-6 text-center font-bold text-2xl">
        <Router />
      // </div>
    // </div>
  );
}

export default App;
