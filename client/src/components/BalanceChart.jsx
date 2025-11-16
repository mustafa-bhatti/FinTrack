import React, { useContext, useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AuthContext } from '../context/auth';
export default function BalanceChart({ balanceType = 'bank' }) {
  const { getBankBalanceReport, transactionRefresh, user } =
    useContext(AuthContext);
  const [balanceData, setBalanceData] = useState([]);

  useEffect(() => {
    const fetchBalanceData = async () => {
      let response = await getBankBalanceReport(8, balanceType);

      if (response.success) {
        let tempBalanceData = response.data.date.map((date, index) => ({
          date: date,
          balance: response.data.balance[index] || 0,
        }));
        let finalData = tempBalanceData;
        if (tempBalanceData.length > 5) {
          if (window.innerWidth <= 500) {
            finalData = tempBalanceData.slice(-5); // Last 5 points on mobile
          } else {
            finalData = tempBalanceData.slice(-7); // Last 7 points on desktop
          }
        }
        setBalanceData(finalData);
      }
    };

    fetchBalanceData();
  }, [transactionRefresh]); // Re-run when balance data changes

  return (
    <div className="chart-container">
      <h3 className="mb-4"> {balanceType.charAt(0).toUpperCase() + balanceType.slice(1)} Balance</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={balanceData}>
          <XAxis dataKey={'date'} fontSize={10} />
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
