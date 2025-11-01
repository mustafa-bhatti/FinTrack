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
      <dialog closedby="any" className="min-w-[65%]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-4 ">
          <h2 className="font-bold text-2xl border-b-1 border-gray-200 pb-2">
            Add New Income
          </h2>
          <p className="text-s">Income Source</p>
          <select
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('source')}
          >
            <option value="salary">Salary</option>
            <option value="business">Business</option>
            <option value="investment">Investment</option>
          </select>
          <p className="text-s">Amount</p>
          <input
            type="number"
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('amount')}
          />
          <p className="text-s">Date</p>
          <input
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('date')}
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded mt-4 hover:bg-green-700"
            disabled={isSubmitting}
          >
            Add Income
          </button>
        </form>
      </dialog>
    </div>
  );
}
