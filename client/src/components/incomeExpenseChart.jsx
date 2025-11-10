/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '../context/auth';

export default function IncomeExpenseChart() {
  const { user } = useContext(DataContext);
  const [report, setReport] = useState(null);
  const { getIncomeExpenseReport, reportLoading, transactionRefresh } =
    useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await getIncomeExpenseReport(10);
      if (response.success) {
        setReport(response.data);
      }
    };
    getData();
  }, [transactionRefresh]); // Re-run when transactions change

  if (reportLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-center mt-2 text-gray-600">Loading chart...</p>
      </div>
    );
  }

  if (report) {
    let incomeData = report.incomeReport;
    let expenseData = report.expenseReport;
    let labels = [];
    // extract the labels from the larger dataset
    labels =
      Object.keys(incomeData).length >= Object.keys(expenseData).length
        ? (labels = Object.keys(incomeData))
        : (labels = Object.keys(expenseData));
    // extract values for each label, defaulting to 0 if not present
    labels.reverse();

    let incomeValues = labels.map((label) => incomeData[label]?.total || 0);
    let expenseValues = labels.map((label) => expenseData[label]?.total || 0);
    // combine the income and expense values into a single array of objects
    let incomeExpenseData = labels.map((label, index) => ({
      month: label,
      income: incomeValues[index],
      expense: expenseValues[index],
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
              fill="rgba(34, 197, 94, 0.8)"
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
}
