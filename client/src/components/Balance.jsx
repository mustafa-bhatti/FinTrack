/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
import { AuthContext } from '../context/auth';
import { FaWallet, FaChartLine, FaSpinner } from 'react-icons/fa';
import { RiBankCardFill, RiMoneyDollarCircleFill } from 'react-icons/ri';
import { MdAccountBalance, MdTrendingUp } from 'react-icons/md';
import BalanceChart from './BalanceChart';

export default function Balance() {
  const { fetchBalances, balanceLoading, balanceRefresh, balances, user } =
    useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(() => {
    return window.innerWidth >= 1024;
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const getbalance = async () => {
      await fetchBalances();
      setIsDataLoaded(true);
    };
    getbalance();
  }, [balanceRefresh]);




  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-100">
      <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="flex min-h-screen">
        <Sidebar showSidebar={showSidebar} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            {/* Header Section */}
            <div className="text-center lg:text-left animate-fadeIn">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Balance Overview
              </h1>
              <p className="text-gray-600 text-lg">
                Track your financial accounts and monitor your wealth
              </p>
            </div>

            {/* Loading State */}
            {balanceLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <FaSpinner className="text-4xl text-blue-600 animate-spin" />
                  <p className="text-gray-600 font-medium">
                    Loading balance data...
                  </p>
                </div>
              </div>
            )}

            {/* Balance Cards */}
            {!balanceLoading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 animate-slideUp">
                {/* Total Balance Card */}
                <div className="md:col-span-3 lg:col-span-1">
                  <div className="bg-linear-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-white bg-opacity-20 rounded-full">
                          <RiMoneyDollarCircleFill
                            size={24}
                            className="text-white"
                          />
                        </div>
                        <h2 className="text-lg lg:text-xl font-semibold">
                          Total Balance
                        </h2>
                      </div>
                      <MdTrendingUp className="text-2xl text-emerald-200" />
                    </div>

                    <div className="space-y-2">
                      <p
                        className={`text-3xl lg:text-4xl font-bold transition-all duration-500 ${
                          isDataLoaded
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        {Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: user?.currency || 'USD',
                        }).format(balances.total)}
                      </p>
                      <p className="text-emerald-100 text-sm">
                        Combined account balance
                      </p>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      <FaWallet className="text-emerald-200" />
                      <span className="text-sm text-emerald-100">
                        Updated {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bank Balance Card */}
                <div className="">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 group-hover:border-blue-300 transform hover:scale-105 transition-all duration-300">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                          <RiBankCardFill size={24} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Bank Account
                          </h3>
                          <p className="text-sm text-gray-500">
                            Primary account
                          </p>
                        </div>
                      </div>
                      <MdAccountBalance className="text-2xl text-blue-400" />
                    </div>

                    <div className="space-y-1">
                      <p
                        className={`text-2xl lg:text-3xl font-bold text-gray-900 transition-all duration-500 ${
                          isDataLoaded
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        {Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: user?.currency || 'USD',
                        }).format(balances.bank)}
                      </p>
             
                    </div>
                  </div>
                </div>

                {/* Wallet Balance Card */}
                <div className="">
                  <div className="bg-white flex flex-col rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 group-hover:border-purple-300 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4 gap-4">
                      <div className="flex items-center space-x-3 gap-1">
                        <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                          <FaWallet size={24} className="text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Cash Wallet
                          </h3>
                          <p className="text-sm text-gray-500">Physical cash</p>
                        </div>
                      </div>
                      <FaChartLine className="text-2xl text-purple-400" />
                    </div>

                    <div className="space-y-1">
                      <p
                        className={`text-2xl lg:text-3xl font-bold text-gray-900 transition-all duration-500 ${
                          isDataLoaded
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        {Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: user?.currency || 'USD',
                        }).format(balances.wallet)}
                      </p>
                    </div>
                    </div>
                  </div>
              </div>
            )}

            {/* Charts Section */}
            {!balanceLoading && (
              <div className="grid grid-cols-1  gap-6 lg:gap-8 animate-slideUp">
                {/* Bank Balance Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <RiBankCardFill size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Bank Balance Trend
                      </h3>
                      <p className="text-sm text-gray-500">
                        Historical bank account balance
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <BalanceChart balanceType="bank" />
                  </div>
                </div>

                {/* Wallet Balance Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FaWallet size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Wallet Balance Trend
                      </h3>
                      <p className="text-sm text-gray-500">
                        Historical cash wallet balance
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <BalanceChart balanceType="wallet" />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            {!balanceLoading && balances.total > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                    <p className="text-sm text-blue-600 font-medium">
                      Bank Share
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {Math.round((balances.bank / balances.total) * 100)}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl">
                    <p className="text-sm text-purple-600 font-medium">
                      Cash Share
                    </p>
                    <p className="text-2xl font-bold text-purple-700">
                      {Math.round((balances.wallet / balances.total) * 100)}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-linear-to-br from-green-50 to-green-100 rounded-xl">
                    <p className="text-sm text-green-600 font-medium">
                      Liquid Assets
                    </p>
                    <p className="text-lg font-bold text-green-700">
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: user?.currency || 'USD',
                      }).format(balances.wallet)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-linear-to-br from-amber-50 to-amber-100 rounded-xl">
                    <p className="text-sm text-amber-600 font-medium">Banked</p>
                    <p className="text-lg font-bold text-amber-700">
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: user?.currency || 'USD',
                      }).format(balances.bank)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
