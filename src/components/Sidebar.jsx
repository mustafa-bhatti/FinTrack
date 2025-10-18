import React from 'react';
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdBarChart,
  MdLogout,
  MdSettings,
} from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';

export default function Sidebar({ showSidebar }) {
  const menuItems = [
    { icon: MdDashboard, label: 'Dashboard', active: true },
    { icon: BiTransfer, label: 'Transactions' },
    { icon: MdAccountBalanceWallet, label: 'Wallet' },
    { icon: MdBarChart, label: 'Reports' },
    { icon: MdSettings, label: 'Settings' },
    { icon: MdLogout, label: 'Log Out', isLogout: true },
  ];

  return (
    <div
      className={`sidebar ${showSidebar ? 'sidebar-open' : 'sidebar-closed'}`}
    >
      {/* <div className="sidebar-header">
        <h2 className={`sidebar-title ${!showSidebar && 'hidden'}`}>
          FinTracker
        </h2>
      </div> */}

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className={`sidebar-item ${item.active ? 'active' : ''} ${
                item.isLogout ? 'logout' : ''
              }`}
            >
              <IconComponent className="sidebar-icon" />
              <span className={`sidebar-label ${!showSidebar && 'hidden'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
