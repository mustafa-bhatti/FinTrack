import React from 'react';
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdBarChart,
  MdLogout,
  MdSettings,
} from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import TransanctionPage from './TransanctionPage';
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
              <Link
                key={index}
                to={
                  item.label !== 'Dashboard'
                    ? '/dashboard/' + item.label.toLowerCase()
                    : '/dashboard'
                }
              >
                <button name={item.label} aria-label={item.label}>
                  <IconComponent className="sidebar-icon" />
                </button>
                <span className={`sidebar-label ${!showSidebar && 'hidden'}`}>
                  {item.label}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
