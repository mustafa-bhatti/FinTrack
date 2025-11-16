import React, { useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from './auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  // Separate loading states for different operations
  const [authLoading, setAuthLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  // Refresh triggers to force component re-renders after data changes
  const [transactionRefresh, setTransactionRefresh] = useState(0);
  const [balanceRefresh, setBalanceRefresh] = useState(0);
  const [adminRefresh, setAdminRefresh] = useState(0);

  // Balance data to share across components
  const [balances, setBalances] = useState({ bank: 0, wallet: 0, total: 0 });
  const [summary, setSummary] = useState({ income: 0, expenses: 0 });
  // const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const API_BASE_URL = 'http://localhost:5002/api/v1';

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/auth/verify`);
          if (response.data.success) {
            // console.log('checkAuth', storedUser);
            setUser(JSON.parse(storedUser));
          } else {
            logout();
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          logout();
        }
      }
      setAuthLoading(false);
    };
    checkAuth();
  }, [token]);

  const register = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        // add user to localstorage

        setToken(token);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, message: 'Registration failed' };
    }
  };
  const login = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login Failed',
      };
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };
  const getTransactions = async () => {
    try {
      // console.log('Fetching income data...');
      // console.log(user.id);
      setTransactionLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/users/${user.id}/transactions`
      );
      if (response.status === 200) {
        setTransactionLoading(false);
        return response.data.transactions;
      }
    } catch (error) {
      setTransactionLoading(false);
      console.error('Error fetching transactions data:', error);
      return { success: false, message: 'Failed to fetch transactions' };
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      setTransactionLoading(true);
      transactionData.user_id = user.id;
      const response = await axios.post(
        `${API_BASE_URL}/users/${user.id}/transactions/add`,
        transactionData
      );
      if (response.status === 200) {
        setTransactionLoading(false);
        // Trigger refresh for components that display transactions and balances
        setTransactionRefresh((prev) => prev + 1);
        setBalanceRefresh((prev) => prev + 1);
        return response.data;
      }
    } catch (error) {
      setTransactionLoading(false);
      console.error('Error adding transaction:', error);
      return { success: false, message: 'Failed to add transaction' };
    }
  };
  const deleteTransaction = async (transactionId) => {
    try {
      setTransactionLoading(true);
      const response = await axios.delete(
        `${API_BASE_URL}/users/${user.id}/transactions/delete/${transactionId}`
      );
      if (response.status === 200) {
        setTransactionLoading(false);
        // Trigger refresh for components that display transactions and balances
        setTransactionRefresh((prev) => prev + 1);
        setBalanceRefresh((prev) => prev + 1);
        return { message: response.data.message, success: true };
      }
    } catch (error) {
      setTransactionLoading(false);
      console.error('Error deleting transaction:', error);
      return { success: false, message: 'Failed to delete transaction' };
    }
  };
  const updateTransaction = async (transactionData) => {
    try {
      setTransactionLoading(true);
      console.log('Updating transaction:', transactionData);
      const response = await axios.put(
        `${API_BASE_URL}/users/${user.id}/transactions/update/${transactionData.id}`,
        transactionData
      );
      if (response.status === 200) {
        setTransactionLoading(false);
        // Trigger refresh for components that display transactions and balances
        setTransactionRefresh((prev) => prev + 1);
        setBalanceRefresh((prev) => prev + 1);
        return { message: response.data.message, success: true };
      }
    } catch (error) {
      setTransactionLoading(false);
      console.error('Error updating transaction:', error);
      return { success: false, message: 'Failed to update transaction' };
    }
  };

  const fetchBalances = async () => {
    try {
      setBalanceLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/users/${user.id}/balances`
      );
      if (response.status === 200) {
        setBalanceLoading(false);
        const balanceData = response.data.balances;
        // Update shared balance state
        setBalances({
          bank: balanceData.bank,
          wallet: balanceData.wallet,
          total: balanceData.bank + balanceData.wallet,
        });
        return balanceData;
      }
    } catch (err) {
      setBalanceLoading(false);
      console.error('Error fetching balances:', err);
      return { success: false, message: 'Failed to fetch balances' };
    }
  };
  const getIncomeExpenseReport = async (monthsNumber) => {
    try {
      setReportLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/users/reports/transactions/${user.id}/${monthsNumber}`
      );
      if (response.status === 200) {
        // console.log('IncomeReport', response.data);
        const processedData = {
          incomeReport:
            Object.values(response.data?.incomeReport)[0]?.total || 0,
          expenseReport:
            Object.values(response.data?.expenseReport)[0]?.total || 0,
        };
        setBalanceRefresh((prev) => prev + 1);
        setSummary({
          income: processedData.incomeReport,
          expenses: processedData.expenseReport,
        });
        setReportLoading(false);
        // setTransactionRefresh((prev) => prev + 1);

        return { data: response.data, success: true };
      }
    } catch (err) {
      setReportLoading(false);
      console.error('Error fetching income expense report:', err);
      return { success: false, message: 'Failed to fetch report' };
    }
  };
  const getBankBalanceReport = async (numOfEntries = 8) => {
    try {
      setReportLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/users/reports/balances/${user.id}/${numOfEntries}`
      );
      if (response.status === 200) {
        setReportLoading(false);
        return { data: response.data, success: true };
      }
    } catch (err) {
      setReportLoading(false);
      console.error('Error fetching bank balance report:', err);
      return { success: false, message: 'Failed to fetch report' };
    }
  };
  const updateUserSettings = async (settingsData) => {
    try {
      setAuthLoading(true);
      const response = await axios.put(
        `${API_BASE_URL}/users/update/${user.id}`,
        settingsData
      );
      // console.log(settingsData);
      if (response.status === 200) {
        setAuthLoading(false);
        // Update user data in context and localStorage if needed
        if (
          response.data.user.email !== user?.email ||
          response.data.user.currency !== user?.currency ||
          response.data.user.name !== user?.name
        ) {
          let { email, currency, name } = response.data.user;
          const updatedUser = { ...user, email, currency, name };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        return {
          success: true,
          message: response.data.message || 'Settings updated successfully',
        };
      }
    } catch (error) {
      setAuthLoading(false);
      console.error('Error updating user settings:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update settings',
      };
    }
  };

  const resetData = async () => {
    try {
      setAuthLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/users/reset/${user.id}`
      );
      if (response.status === 200) {
        setAuthLoading(false);
        setTransactionRefresh((prev) => prev + 1);
        setBalanceRefresh((prev) => prev + 1);
        return {
          success: true,
          message: response.data.message || 'Data reset successfully',
        };
      }
    } catch (error) {
      setAuthLoading(false);
      console.error('Error resetting data:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to reset data',
      };
    }
  };
  const getAppStats = useCallback(async () => {
    try {
      setAdminLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/stats`);
      if (response.status === 200) {
        setAdminLoading(false);
        return response.data;
      }
    } catch (error) {
      setAdminLoading(false);
      console.error('Error fetching app stats:', error);
      return { success: false, message: 'Failed to fetch app stats' };
    }
  }, [API_BASE_URL]);
  const fetchUsers = useCallback(async () => {
    try {
      setAdminLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/users`);
      if (response.status === 200) {
        setAdminLoading(false);
        return response.data;
      }
    } catch (error) {
      setAdminLoading(false);
      console.error('Error fetching users:', error);
      return [];
    }
  }, [API_BASE_URL]);

  const deleteUserbyAdmin = async (userId) => {
    try {
      setAdminLoading(true);
      const response = await axios.delete(
        `${API_BASE_URL}/admin/users/${userId}`
      );
      if (response.status === 200) {
        setAdminLoading(false);
        setAdminRefresh((prev) => prev + 1);
        return { success: true, message: 'User deleted successfully' };
      }
    } catch (error) {
      setAdminLoading(false);
      console.error('Error deleting user:', error);
      return { success: false, message: 'Failed to delete user' };
    }
  };
  const updateUserbyAdmin = async (userId, userData) => {
    try {
      setAdminLoading(true);
      const response = await axios.put(
        `${API_BASE_URL}/admin/users/${userId}/role`,
        { isAdmin: userData }
      );
      if (response.status === 200) {
        setAdminLoading(false);
        setAdminRefresh((prev) => prev + 1);
        return {
          success: true,
          message: response.data.message || 'User updated successfully',
        };
      }
    } catch (error) {
      setAdminLoading(false);
      console.error('Error updating user:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update user',
      };
    }
  };

  const value = {
    user,
    authLoading, // Overall auth loading state
    transactionLoading,
    reportLoading,
    balanceLoading,
    transactionRefresh,
    balanceRefresh,
    adminRefresh,
    balances, // Shared balance data
    register,
    login,
    logout,
    updateUserSettings,
    token, // Auth token
    isAuthenticated: !!user, // Boolean indicating auth status
    isAdmin: user?.isAdmin || false,
    getTransactions,
    addTransaction,
    fetchBalances,
    deleteTransaction,
    updateTransaction,
    getIncomeExpenseReport,
    summary, // Summary data
    resetData,
    getBankBalanceReport,
    getAppStats,
    fetchUsers,
    deleteUserbyAdmin,
    updateUserbyAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
