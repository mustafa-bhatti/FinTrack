import React, { useContext, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { AuthContext } from '../context/auth';
export default function AddIncome({ editData, setEditData }) {
  const { addTransaction, updateTransaction } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: 'salary',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      source: 'bank',
    },
  });
  // Handle dialog close to reset editData
  useEffect(() => {
    const dialog = document.querySelector('.income-dialog');
    const handleClose = () => {
      setEditData(null);
    };
    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleClose);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleClose);
    };
  }, [setEditData]);

  // Form submission
  const onSubmit = async (data) => {
    data.type = 'income';
    if (editData) {
      console.log('editing data');
      data.id = editData.id;
      const response = await updateTransaction(data);
      if (response.success) {
        console.log('Transaction updated successfully');
      } else {
        console.log('Error updating transaction');
      }
    } else {
      const response = await addTransaction(data);
      if (response.success) {
        console.log(response.message);
      } else {
        console.log('Err: ', response.message);
      }
    }
    // Reset form and close dialog
    reset();
    setEditData(null);
    const dialog = document.querySelector('.income-dialog');
    dialog.close();

    // console.log(response);
  };
  // Populate form if editData changes
  useEffect(() => {
    if (editData?.type === 'income') {
      // Set form values for editing
      reset({
        category: editData.category,
        amount: editData.amount,
        date: new Date(editData.date).toISOString().split('T')[0],
        source: editData.source,
      });
      const dialog = document.querySelector('.income-dialog');
      dialog.showModal();
    } else if (!editData) {
      reset({
        category: 'salary',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        source: 'bank',
      });
    }
  }, [editData, setValue, reset]);

  return (
    <div className="add-income-dialog">
      <dialog closedby="any" className="income-dialog min-w-[65%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-4 "
        >
          <h2 className="font-bold text-2xl border-b border-gray-200 pb-2">
            {editData ? 'Edit Income' : 'Add New Income'}
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
            step="0.01"
            min="0.01"
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
