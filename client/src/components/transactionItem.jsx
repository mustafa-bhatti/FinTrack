import React, { useContext, useEffect, useRef, useState } from 'react';
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
import business from '../assets/transactions/business.svg';
import investment from '../assets/transactions/investment.svg';
import deleteIcon from '../assets/transactions/delete.svg';
import { AuthContext } from '../context/auth';
import { CiMenuKebab } from 'react-icons/ci';
import AddIncome from './AddIncome';
// import all the icons from '../assets/transactions'

export default function TransactionItem({
  id,
  category,
  source,
  value,
  date,
  type,
  currency,
  setEditData,
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
    Business: business,
    Investment: investment,
    Delete: deleteIcon,
    Other: fallback,
  };
  const { deleteTransaction } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const showDialog = (name) => {
    let dialog = document.querySelector(`.${name}-dialog`);
    dialog.showModal();
  };
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const Uppercase = (text) => {
    return text[0].toUpperCase() + text.slice(1);
  };

  const Icon = icons[Uppercase(category)] || fallback;

  // console.log(transId);
  const handleDelete = async (deleteId) => {
    // Implement delete functionality here
    console.log(deleteId);
    const response = await deleteTransaction(deleteId);
    if (response.success) {
      console.log('Transaction deleted successfully');
    } else {
      console.log('Error deleting transaction');
    }
  };

  const handleEdit = async (formData) => {
    // Implement edit functionality here

    showDialog(type);
    setEditData({
      id: formData.id,
      category: formData.category,
      amount: formData.value,
      date: formData.date,
      source: formData.source,
      type: formData.type,
    });
    console.log('Editing transaction:', formData);
  };

  return (
    <div className="transaction-item flex justify-between items-center p-2 rounded-lg shadow-lg  hover:scale-103 transition duration-300 bg-white ">
      <div className="flex gap-3 p-4 justify-center items-center">
        <img src={Icon} alt={category} className="w-12 h-12"></img>
        <div className="font-semibold text-[14px] lg:text-[16px]">
          <p>{Uppercase(category)}</p>
          <p className="text-[12px] text-gray-700 font-medium">
            {Uppercase(source)}
          </p>
        </div>
      </div>
      <div
        className="text-[13px] lg:text-[14px] flex flex-row-reverse gap-4 relative"
        ref={menuRef}
      >
        <CiMenuKebab
          className={`w-5 h-5 transition-opacity duration-300 self-center cursor-pointer `}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <div
          className={`absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="p-1">
            <li
              className="px-4 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                handleEdit({ id, category, source, value, date, type })
              }
            >
              Edit
            </li>
            <li
              className="px-4 py-2 rounded-lg text-sm text-red-700 hover:bg-red-100 cursor-pointer flex-initial"
              onClick={() => handleDelete(id)}
            >
              Delete
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <p
            className={`${
              type === 'income'
                ? 'text-green-500 bg-green-100 rounded-2xl p-1 px-4  flex-0 self-end'
                : 'text-red-500 bg-red-100  rounded-2xl p-1 px-4 flex-0 self-end'
            }`}
          >
            {/* show currency using js library intl comma seperated or their symbols */}
            <span className="currency">
              {/* {currency == 'USD' ? '$' : ''}
              {type === 'income' ? value : -value}{' '}
              {currency !== 'USD' ? currency : ''} */}
              {new Intl.NumberFormat('en-US', 
              { 
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
                style: 'currency',
                currency: currency,
              }).format(type === 'income' ? value : -value)}
            </span>
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
