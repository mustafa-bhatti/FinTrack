import React, { useContext } from 'react';
import { DataContext } from '../context/data';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
export default function BalanceChart() {
  const { user } = useContext(DataContext);
  let balanceData = user.balanceData.labels.map((label, index) => ({
    date: label,
    balance: user.balanceData.datasets.data[index],
  }));
  if (balanceData.length>5){
    if (window.innerWidth <=500){
        balanceData = balanceData.slice(-5);
        console.log(balanceData)
    }
    else{
        balanceData = balanceData.slice(-7);

    }
  }
  //   console.log(balanceData);

  return (
    <div className="chart-container">
      <h3 className="mb-4">{user.balanceData.datasets.label}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={balanceData}>
          <XAxis dataKey={'date'} />
          <YAxis
    
            tickFormatter={(value) =>
              `${user.currency} ${value.toLocaleString()}`
            }
            fontSize={12}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="lime"
            fill="rgba(34, 197, 94, 0.2)"
            strokeWidth={3}
            name="balance"
            activeDot={{ r: 4, stroke: 'rgba(34, 197, 94, 1)', strokeWidth: 1 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
