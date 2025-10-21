import React, { useState } from 'react';
import '../styles/transactionPage.css';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
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
          
        </div>
      </div>
    </div>
  );
}
