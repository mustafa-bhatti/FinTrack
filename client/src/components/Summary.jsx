/* eslint-disable */
import { MdAttachMoney } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AuthContext } from '../context/auth';
import React, { useContext, useEffect } from 'react';

export default function Summary() {
  const { balances, fetchBalances, summary, transactionRefresh, user } =
    useContext(AuthContext);
  let currency = user?.currency;
  // Fetch balances if they haven't been loaded yet
  useEffect(() => {
    const fetchData = async () => {
      await fetchBalances();
    };
    fetchData();
  }, [transactionRefresh]);
  return (
    <>
      <div className="summary-container">
        <div className="components">
          <div className="flex flex-col justify-center items-center gap-2 p-2 ">
            <div className="icon bg-green-600">
              <MdAttachMoney fontSize="1.5em" color="white" />
            </div>
            <p>Current Balance</p>
            <p
              className={`${
                balances.total < 0 ? 'text-red-700' : 'text-green-900'
              } font-bold`}
            >
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency || 'USD',
              }).format(balances.total)}
            </p>
          </div>
        </div>
        <div className="components">
          <div className="flex flex-col justify-center items-center gap-2 p-2 ">
            <div className="icon bg-blue-600">
              <FaMoneyBillAlt fontSize="1.5em" color="white" />
            </div>
            <p>Income</p>
            <p className="text-green-900 font-bold">
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency || 'USD',
              }).format(summary?.income)}
            </p>
          </div>
        </div>
        {/* expenses */}
        <div className="components">
          <div className="flex flex-col justify-center items-center gap-2 p-2 ">
            <div className="icon bg-yellow-600">
              <GiReceiveMoney fontSize="1.5em" color="white" />
            </div>
            <p>Expenses</p>
            <p className="text-red-700 font-bold">
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency || 'USD',
              }).format(summary?.expenses)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
