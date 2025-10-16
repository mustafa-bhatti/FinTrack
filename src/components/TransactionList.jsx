import React from 'react';
import TransactionItem from './transactionItem';

export function TransactionList() {
  return (
      <div className="flex flex-col gap-0.5 col-span-1 w-full p-2">
        <h1 className='font-bold'>Transactions</h1>

        <TransactionItem category="Other" source="wallet" value={1000} date={"19-02-2005"} />
        <TransactionItem category="Other" source="wallet" value={1000} date={"19-02-2005"} />
        <TransactionItem category="Other" source="wallet" value={1000} date={"19-02-2005"} />
        <TransactionItem category="Other" source="wallet" value={1000} date={"19-02-2005"} />
        <TransactionItem category="Other" source="wallet" value={1000} date={"19-02-2005"} />
        <TransactionItem category="Other" source="wallet" value={1000} date={"19-02-2005"} />
      </div>

  );
}
