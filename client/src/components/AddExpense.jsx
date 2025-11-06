import React, { useContext } from 'react';
import { set, useForm } from 'react-hook-form';
import { AuthContext } from '../context/auth';
export default function AddExpense() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const { addTransaction } = useContext(AuthContext);

  const onSubmit = async (data) => {
    data.type = 'expense';
    const response = await addTransaction(data);
    console.log(response);

    // Call the API to add the expense
  };
  return (
    <div className="add-expense-dialog">
      <dialog closedby="any" className="expense-dialog min-w-[65%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-4 "
        >
          <h2 className="font-bold text-2xl border-b border-gray-200 pb-2">
            Add New Expense
          </h2>
          <p className="text-s">Expense Category</p>
          <select
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('category')}
          >
            <option value="Eating">Eating</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
            <option value="Groceries">Groceries</option>
            <option value="Rent">Rent</option>
            <option value="Health">Health</option>
            <option value="Gift">Gift</option>
            <option value="Fuel">Fuel</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
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
          <p className="text-s">Source</p>
          <select
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('source', { required: true })}
          >
            <option value="bank">Bank</option>
            <option value="wallet">Wallet</option>
          </select>
          <button
            type="submit"
            className="bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-700 "
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Expense...' : 'Add Expense'}
          </button>
        </form>
      </dialog>
    </div>
  );
}
