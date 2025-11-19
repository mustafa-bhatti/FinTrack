import React, { useState } from 'react';
import '../styles/transactionPage.css';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
import { TransactionList } from './TransactionList';
import AddIncome from './AddIncome';
import '../styles/transactionPage.css';
import AddExpense from './AddExpense';
import '../styles/animations.css';
export default function TransactionPage() {
  const [showSidebar, setShowSidebar] = useState(() => {
    return window.innerWidth >= 1024;
  });
  const [editData, setEditData] = useState(null);

  const showDialog = (name) => {
    let dialog = document.querySelector(`.${name}-dialog`);
    dialog.showModal();
  };
  return (
    <div className="transaction-page">
      <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <div className="flex min-h-screen">
        <Sidebar showSidebar={showSidebar} />
        <div className="transaction-dashboard animate-slideUp">
          <AddIncome editData={editData} setEditData={setEditData} />
          <AddExpense editData={editData} setEditData={setEditData} />
          <div className="t-buttons flex gap-15 justify-center">
            {/* buttons */}
            <button
              onClick={() => showDialog('income')}
              className="bg-green-200 p-5 rounded-2xl text-green-900 font-bold uppercase hover:border hover:-translate-y-0.5 transition-all"
            >
              Add Income
            </button>

            <button
              onClick={() => showDialog('expense')}
              className="bg-red-200 p-5 rounded-2xl text-red-950 font-bold uppercase hover:-translate-y-1 hover:border transition-all"
            >
              Add Expense
            </button>
          </div>
          <div className="divider flex flex-col lg:flex-row gap-4 lg:flex-1 animate-slideUp ">
            <TransactionList name="Income" setEditData={setEditData} />
            <TransactionList name="Expense" setEditData={setEditData} />
          </div>
        </div>
      </div>
    </div>
  );
}
