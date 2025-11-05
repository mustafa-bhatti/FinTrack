import React, { useContext } from 'react';
import TransactionItem from './transactionItem';
import { DataContext } from '../context/data';
import { AuthContext } from '../context/auth';
import { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';

export function TransactionList({ name = 'Transactions' }) {
  const { getTransactions, loading } = useContext(AuthContext);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let incomeData = await getTransactions();
      setIncomeData(incomeData);
      console.log(incomeData);
    };
    getData();
  }, [loading]);

  const { user } = useContext(DataContext);
  // const userTransactions = user.transactions.filter(
  //   (item) => item.type == name.toLowerCase()
  // );
  // console.log(userTransactions);
  // TODO: Sort them by date ascending order
  return (
    <div className="flex flex-col gap-3 col-2 w-full p-2 flex-1">
      <h1 className="font-bold">{name}</h1>
      {incomeData?.map((transaction, index) => {
        // console.log(transaction._id);
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
            />
          );
        }
      })}
    </div>
  );
}
