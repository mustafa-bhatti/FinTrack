import React, { useContext } from 'react';
import TransactionItem from './transactionItem';
import { DataContext } from '../context/data';

export function TransactionList({ name = 'Transactions' }) {
  const { user } = useContext(DataContext);

  return (
    <div className="flex flex-col gap-3 col-2 w-full p-2 flex-1">
      <h1 className="font-bold">{name}</h1>
      {user.transactions.map((transaction, index) => {
        if (name == 'Income' && transaction.type == 'income') {
          // console.log();
          return (
            <TransactionItem
              key={index}
              category={transaction.category}
              source={transaction.source}
              value={transaction.amount}
              date={transaction.date}
              type={transaction.type}
              currency={user.currency}
            />
          );
        } else if (name == 'Transactions') {
          console.log(name);
          return (
            <TransactionItem
              key={index}
              category={transaction.category}
              source={transaction.source}
              value={transaction.amount}
              date={transaction.date}
              type={transaction.type}
              currency={user.currency}
            />
          );
        } else if (name == 'Expenses' && transaction.type == 'expense') {
          return (
            <TransactionItem
              key={index}
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
