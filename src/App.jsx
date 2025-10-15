import { useState } from 'react';

import './App.css';
import Summary from './components/Summary';
import Dashboard from './components/Dashboard';
import DataProvider from './context/dataProvider';

function App() {
  return (
    <>
      <DataProvider>
        <Dashboard />
      </DataProvider>
    </>
  );
}

export default App;
