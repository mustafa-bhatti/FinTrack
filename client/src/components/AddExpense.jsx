import React, { use, useContext, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { AuthContext } from '../context/auth';
export default function AddExpense({ editData, setEditData }) {
  const { addTransaction, updateTransaction } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: 'eating',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      source: 'bank',
    },
  });
  // Handle dialog close to reset editData
  useEffect(() => {
    const dialog = document.querySelector('.expense-dialog');
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
    data.type = 'expense';
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
        console.log('Transaction added successfully');
      } else {
        console.log(response);
        console.log('Error adding transaction');
      }
    }
    // Reset form and close dialog
    reset();
    setEditData(null);
    const dialog = document.querySelector('.expense-dialog');
    dialog.close();

    // console.log(response);
  };
  // Populate form if editData changes
  useEffect(() => {
    if (editData?.type === 'expense') {
      // Set form values for editing
      reset({
        category: editData.category,
        amount: editData.amount,
        date: new Date(editData.date).toISOString().split('T')[0],
        source: editData.source,
      });
      const dialog = document.querySelector('.expense-dialog');
      dialog.showModal();
    } else if (!editData) {
      reset({
        category: 'eating',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        source: 'bank',
      });
    }
  }, [editData, setValue, reset]);
  return (
    <div className="add-expense-dialog">
      <dialog closedby="any" className="expense-dialog min-w-[65%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-4 "
        >
          <h2 className="font-bold text-2xl border-b border-gray-200 pb-2">
            {editData?.type === 'expense' ? 'Edit Expense' : 'Add Expense'}
          </h2>
          <p className="text-s">Expense Category</p>
          <select
            className="p-2 border border-gray-300 rounded bg-gray-200"
            {...register('category')}
          >
            <option value="eating">Eating</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="health">Health</option>
            <option value="gift">Gift</option>
            <option value="fuel">Fuel</option>
            <option value="transport">Transport</option>
            <option value="other">Other</option>
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
