import React, { useContext } from 'react';
import TransactionItem from './transactionItem';
import { DataContext } from '../context/data';

export function TransactionList() {
  const { user} = useContext(DataContext);

  return (
      <div className="flex flex-col gap-0.5 col-span-1 w-full p-2">
        <h1 className='font-bold'>Transactions</h1>
        {user.transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            category={transaction.category}
            source={transaction.source}
            value={transaction.amount}
            date={transaction.date}
          />
        ))}
      </div>
  );
}


