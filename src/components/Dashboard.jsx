import React from 'react';
import userData from './data/user1.json';

function Dashboard() {
  return (
    <div className="app grid grid-cols-5 grid-rows-5">
      <div className="col-span-full bg-gray-700 text-white p-6 text-center font-bold text-2xl">
        <h1>Fin Track</h1>
        <p>Welcome, {userData.name}!</p>
        <Summary />
      </div>
    </div>
  );
}

export default Dashboard;
