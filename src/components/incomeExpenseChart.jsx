import React, { useContext } from 'react';
import { DataContext } from '../context/data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
export default function IncomeExpenseChart() {
  const { user } = useContext(DataContext);

  let incomeExpenseData = user.incomeData.labels.map((label, index) => ({
    month: label,
    income: user.incomeData.data[index],
    expense: user.expenseData.data[index],
  }));
  if (incomeExpenseData.length > 5) {
    if (window.innerWidth <= 500) {
      incomeExpenseData = incomeExpenseData.slice(-5);
      console.log(incomeExpenseData);
    } else {
      incomeExpenseData = incomeExpenseData.slice(-7);
    }
  }
  //   console.log(balanceData);

  return (
    <div className="chart-container">
      <h3 className="mb-4">Income vs Expense</h3>
      <ResponsiveContainer width="99%" height={400}>
        <BarChart data={incomeExpenseData}>
          <XAxis dataKey={'month'} />
          <YAxis
            tickFormatter={(value) =>
              `${user.currency} ${value.toLocaleString()}`
            }
            fontSize={12}
          />
          <Tooltip />
          <Legend />
          <Bar
            // type="monotone"
            dataKey="income"
            name="Income"
            fill="rgba(34, 197, 94, 1)"
          />
          <Bar
            // type="monotone"
            dataKey="expense"
            name="Expense"
            fill="rgba(239, 68, 68, 0.8)"
     
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
