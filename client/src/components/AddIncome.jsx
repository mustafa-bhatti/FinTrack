import React from 'react';
import { set, useForm } from 'react-hook-form';
export default function AddIncome() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="add-income-dialog">
      <dialog closedby="any" className="income-dialog min-w-[65%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-4 "
        >
          <h2 className="font-bold text-2xl border-b-1 border-gray-200 pb-2">
            Add New Income
          </h2>
          <p className="text-s">Income Source</p>
          <select
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('source', { required: true })}
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
