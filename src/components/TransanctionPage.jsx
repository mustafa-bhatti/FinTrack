import React, { useState } from 'react';
import '../styles/transactionPage.css';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
import { TransactionList } from './transactionList';
export default function TransanctionPage() {
  const [showSidebar, setShowSidebar] = useState(() => {
    return window.innerWidth >= 1024;
  });
  return (
    <div className="transaction-page">
      <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <div className="flex min-h-screen">
        <Sidebar showSidebar={showSidebar} />
        <div className="transaction-dashboard">
          <div className="t-buttons flex gap-15 justify-center">
            <button className="bg-green-200 p-5 rounded-2xl text-green-900 font-bold uppercase hover:border hover:-translate-y-0.5 transition-all">
              Add Income
            </button>
            <button className="bg-red-200 p-5 rounded-2xl text-red-950 font-bold uppercase hover:-translate-y-1 hover:border transition-all">
              Add Expense
            </button>
          </div>
          <div className="divider flex flex-col flex-1 lg:flex-row gap-4">
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
}
