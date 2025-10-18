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
            <div className="divider flex flex-col flex-1 lg:flex-row gap-4">
            <TransactionList/>
              <h1 className='bg-amber-500 flex-2'>Space</h1>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
