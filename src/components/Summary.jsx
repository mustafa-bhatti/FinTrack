import { MdAttachMoney } from 'react-icons/md';
import { GiReceiveMoney } from "react-icons/gi";

import { FaMoneyBillAlt } from "react-icons/fa";
import { DataContext } from '../context/data';
import React, { useContext } from 'react';

export default function Summary() {
  const { user } = useContext(DataContext);
  let income = user.income;
  // let expenses = user.expenses;
  let balance = user.balance;
  return (
    <>
      <div className='summary-container'>
        <div className="components">
          <div className="flex flex-col justify-center items-center gap-2 p-2 ">
            <div className="icon bg-green-600">
              <MdAttachMoney fontSize="1.5em" color="white" />
            </div>
            <p>Current Balance</p>
            <p className="text-green-900 font-bold"> $ {balance}</p>
          </div>
        </div>
        <div className="components">
          <div className="flex flex-col justify-center items-center gap-2 p-2 ">
            <div className="icon bg-blue-600">
              <FaMoneyBillAlt fontSize="1.5em" color="white" />
            </div>
            <p>Income</p>
            <p className="text-green-900 font-bold">$ {income}</p>
          </div>
        </div>
        {/* expenses */}
        <div className="components">
          <div className="flex flex-col justify-center items-center gap-2 p-2 ">
            <div className="icon bg-yellow-600">
              <GiReceiveMoney fontSize="1.5em" color="white" />
            </div>
            <p>Expenses</p>
            <p className="text-red-700 font-bold"> $ {income}</p>
          </div>
        </div>
      </div>
    </>
  );
}
