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

  const Icon = icons[category] || fallback;

  return (
    <div className="flex justify-between items-center p-2 rounded-lg shadow-lg  hover:scale-105 transition duration-300 bg-white">
      <div className="flex gap-3 p-4 justify-center items-center">
        <img src={Icon} alt={category} className=""></img>
        <div className="font-semibold text-[14px]">
          <p>{category}</p>
          <p>{source}</p>
        </div>
      </div>
      <div className="">
        <div>
          <p className={`${type === 'income' ? 'text-green-500 bg-green-100 rounded-2xl p-1 text-center' : 'text-red-500 bg-red-100  rounded-2xl p-1 text-center'}`}>${type === 'income' ? value : -value}</p>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}
