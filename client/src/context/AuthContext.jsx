import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from './auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
  const getIncome = async () => {
    try {
      // console.log('Fetching income data...');
      // console.log(user.id);
      const response = await axios.get(
        `${API_BASE_URL}/users/${user.id}/incomes`
      );
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    token,
    isAuthenticated: !!user,
    getIncome,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
