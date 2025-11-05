import React from 'react';
import fallback from '../assets/transactions/default.svg';
import eating from '../assets/transactions/eating.svg';
import shopping from '../assets/transactions/shopping.svg';
import entertainment from '../assets/transactions/entertainment.svg';
import travel from '../assets/transactions/travel.svg';
import grocery from '../assets/transactions/grocery.svg';
import salary from '../assets/transactions/salary.svg';
import home from '../assets/transactions/home.svg';
import health from '../assets/transactions/health.svg';
import gift from '../assets/transactions/gift.svg';
import fuel from '../assets/transactions/fuel.svg';
import transport from '../assets/transactions/transportation.svg';
// import all the icons from '../assets/transactions'

export default function TransactionItem({
  category,
  source,
  value,
  date,
  type,
  currency,
}) {
  const icons = {
    Eating: eating,
    Shopping: shopping,
    Entertainment: entertainment,
    Travel: travel,
    Groceries: grocery,
    Salary: salary,
    Rent: home,
    Health: health,
    Gift: gift,
    Fuel: fuel,
    Transport: transport,
    Other: fallback,
  };
  const Uppercase = (text) => {
    console.log(text.slice(1));
    return text[0].toUpperCase() + text.slice(1);
  };
  const Icon = icons[Uppercase(category)] || fallback;

  return (
    <div className="transaction-item flex justify-between items-center p-2 rounded-lg shadow-lg  hover:scale-103 transition duration-300 bg-white ">
      <div className="flex gap-3 p-4 justify-center items-center">
        <img src={Icon} alt={category} className=""></img>
        <div className="font-semibold text-[14px] lg:text-[16px]">
          <p>{Uppercase(category)}</p>
          <p className="text-[12px] text-gray-700 font-medium">
            {Uppercase(source)}
          </p>
        </div>
      </div>
      <div className="text-[13px] lg:text-[14px]">
        <div className='flex flex-col'>
          <p
            className={`${
              type === 'income'
                ? 'text-green-500 bg-green-100 rounded-2xl p-1 px-4  flex-0 self-end'
                : 'text-red-500 bg-red-100  rounded-2xl p-1 px-4 flex-0 self-end'
            }`}
          >
            {currency == 'USD' ? '$' : ''}
            {type === 'income' ? value : -value}{' '}
            {currency !== 'USD' ? currency : ''}
          </p>
          <p className="my-1 flex-1">
            {new Date(date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
