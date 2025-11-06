import React, { useContext, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { AuthContext } from '../context/auth';
export default function AddIncome() {
  const { addTransaction } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const [message, setMessage] = useState({ text: '', type: '' });
  const onSubmit = async (data) => {
    data.type = 'income';
    const response = await addTransaction(data);
    console.log(response);

    // Call the API to add the income
  };
  const showMessage = (text, msgType) => {
    setMessage({ text, type: msgType });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  return (
    <div className="add-income-dialog">
      <dialog closedby="any" className="income-dialog min-w-[65%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-4 "
        >
          <h2 className="font-bold text-2xl border-b border-gray-200 pb-2">
            Add New Income
          </h2>
          <p className="text-s">Income Category</p>
          <select
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('category', { required: true })}
          >
            <option value="salary">Salary</option>
            <option value="business">Business</option>
            <option value="investment">Investment</option>
          </select>
          <p className="text-s">Amount</p>
          <input
            required
            type="number"
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('amount', {
              required: true,
              min: { value: 0.01, message: 'Amount must be greater than 0' },
            })}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}

          <p className="text-s">Date</p>
          <input
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('date', { required: true })}
          />
          <p className="text-s"> Source</p>
          <select
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('source', { required: true })}
          >
            <option value="bank">Bank</option>
            <option value="wallet">Wallet</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded mt-4 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Income...' : 'Add Income'}
          </button>
        </form>
      </dialog>
    </div>
  );
}
