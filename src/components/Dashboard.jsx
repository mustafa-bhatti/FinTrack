import React, { useContext, useState } from 'react';
import Summary from './Summary';
import { DataContext } from '../context/data';
import '../styles/dashboard.css';
import { TransactionList } from './transactionList';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';

function Dashboard() {
  const { user } = useContext(DataContext);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className='dashboard-container flex flex-col'>
        <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />

        <div className='flex min-h-screen'>
          <Sidebar showSidebar={showSidebar} />
          <div className="dashboard">
            <Summary />
            <div className="divide">
            <TransactionList/>
              <h1>Space</h1>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
