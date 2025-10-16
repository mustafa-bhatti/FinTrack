import React from 'react';
import fallback from '../assets/transactions/default.svg';
export default function TransactionItem({ category, source, value, date }) {
  return (
    <div className="flex justify-between items-center p-2 rounded-lg shadow-md">
      <div className='flex gap-3 p-4 justify-center items-center'>
        <img src={fallback} alt='fallback' className=''></img>
        <div className='font-semibold text-[14px]'>
          <p>{category}</p>
          <p>{source}</p>
        </div>
        </div>
        <div className=''>
          <div>
            <p>${value}</p>
            <p>{date}</p>
          </div>
      </div>
    </div>
  );
}
