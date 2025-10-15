import React, { useContext } from 'react';
import Summary from './Summary';
import { DataContext } from '../context/data';
import '../styles/dashboard.css';
function Dashboard() {
  const { user } = useContext(DataContext);
  //   console.log(user);
  return (
    <div className="dashboard">
      <div className="navbar">
        <h1>Fin Track</h1>
        <p>Welcome, {user.name}!</p>
      </div>
      <Summary income={user.income} expenses={user.expenses} />
    </div>
  );
}

export default Dashboard;
