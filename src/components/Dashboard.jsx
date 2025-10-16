import React, { useContext } from 'react';
import Summary from './Summary';
import { DataContext } from '../context/data';
import '../styles/dashboard.css';
import { TransactionList } from './transactionList';
function Dashboard() {
  const { user } = useContext(DataContext);
  //   console.log(user);
  return (
    <>
      <div className="navbar">
        <h1>Fin Track</h1>
        <p>Welcome, {user.name}!</p>
      </div>
    <div className="dashboard">
      <Summary />
      <TransactionList/>
    </div>
    </>
  );
}

export default Dashboard;
