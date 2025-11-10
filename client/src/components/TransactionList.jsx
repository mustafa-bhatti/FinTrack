/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import TransactionItem from './transactionItem';
import { DataContext } from '../context/data';
import { AuthContext } from '../context/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function TransactionList({ name = 'Transactions', setEditData }) {
  const { getTransactions, user, transactionLoading, transactionRefresh } =
    useContext(AuthContext);
  const [incomeData, setIncomeData] = useState([]);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  useEffect(() => {
    const getData = async () => {
      let incomeData = await getTransactions();
      setIncomeData(incomeData);
      console.log(incomeData);
    };

    getData();
  }, [transactionRefresh]); // Re-run when transactions change

  // const userTransactions = user.transactions.filter(
  //   (item) => item.type == name.toLowerCase()
  // );
  // console.log(userTransactions);
  // TODO: Sort them by date ascending order
  return (
    <div className="flex flex-col gap-3 col-2 w-full p-2 flex-1">
      <h1 className="font-bold">{name}</h1>
      {transactionLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : incomeData.length === 0 && !transactionLoading ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        incomeData?.map((transaction, index) => {
          // console.log(transaction._id);
          if (index >= 5 && isDashboard) return;
          transaction.type = transaction.type.toLowerCase();
          if (name == 'Income' && transaction.type == 'income') {
            return (
              <TransactionItem
                key={index}
                id={transaction._id}
                category={transaction.category}
                source={transaction.source}
                value={transaction.amount}
                date={transaction.date}
                type={transaction.type}
                currency={user.currency}
                setEditData={setEditData}
              />
            );
          } else if (name == 'Transactions') {
            return (
              <TransactionItem
                key={index}
                id={transaction._id}
                category={transaction.category}
                source={transaction.source}
                value={transaction.amount}
                date={transaction.date}
                type={transaction.type}
                currency={user.currency}
                setEditData={setEditData}
              />  
            );
          } else if (name == 'Expense' && transaction.type == 'expense') {
            return (
              <TransactionItem
                key={index}
                id={transaction._id}
                category={transaction.category}
                source={transaction.source}
                value={transaction.amount}
                date={transaction.date}
                type={transaction.type}
                currency={user.currency}
                setEditData={setEditData} 
              />
            );
          }
        })
       )}
    </div>  
  );  
}
