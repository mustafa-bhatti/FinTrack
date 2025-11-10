/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import '../styles/balance.css';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
import '../styles/transactionPage.css';
import { AuthContext } from '../context/auth';
import { FaWallet } from 'react-icons/fa';
import { RiBankCardFill } from 'react-icons/ri';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

export default function Balance() {
  const { fetchBalances, balanceLoading, balanceRefresh, balances } =
    useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(() => {
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    const getbalance = async () => {
      await fetchBalances(); // This will update the shared balances state
    };
    getbalance();
  }, [balanceRefresh]); // Re-run when balances change

  return (
    <div className="balance-page">
      <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <div className="flex min-h-screen">
        <Sidebar showSidebar={showSidebar} />
        <div className="balance-dashboard">
          <div className="total-balance">
            <div className="bank">
              <RiMoneyDollarCircleFill color="green" size={30} />
              <h1 className="total">Total Balance:</h1>
            </div>{' '}
            <p>{balances.total}</p>
          </div>

          <ul className="balance-details">
            <li>
              <div className="bank-balance">
                <div className="bank">
                  <RiBankCardFill color="green" size={30} />
                  <h1>Bank balance:</h1>
                </div>{' '}
                <p>{balances.bank}</p>
              </div>
            </li>
            <li>
              <div className="wallet-balance">
                <div className="wallet">
                  <FaWallet color="black" size={30} />
                  <h1>Wallet balance: </h1>
                </div>{' '}
                <p>{balances.wallet}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
