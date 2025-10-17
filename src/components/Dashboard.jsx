import React, { useContext } from 'react';
import Summary from './Summary';
import { DataContext } from '../context/data';
import '../styles/dashboard.css';
import { TransactionList } from './transactionList';
import NavbarDashboard from './NavbarDashboard';
function Dashboard() {
  const { user } = useContext(DataContext);
  //   console.log(user);
  return (
    <>
      <NavbarDashboard />
    <div className="dashboard">
      <Summary />
      <TransactionList/>
    </div>
    </>
  );
}

export default Dashboard;
