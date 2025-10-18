import React, { useContext, useState } from 'react';
import Summary from './Summary';
import { DataContext } from '../context/data';
import '../styles/dashboard.css';
import { TransactionList } from './transactionList';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';

function Dashboard() {
  const { user } = useContext(DataContext);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <div className="dashboard">
        <Sidebar showSidebar={showSidebar} />
        {/* <Summary /> */}
        {/* <TransactionList/> */}
      </div>
    </>
  );
}

export default Dashboard;
