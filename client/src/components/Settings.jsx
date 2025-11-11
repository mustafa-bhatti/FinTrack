import React, { useState, useContext } from 'react';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
import { AuthContext } from '../context/auth';
import { useForm } from 'react-hook-form';
import '../styles/animations.css';
import {
  FaUser,
  FaLock,
  FaDollarSign,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaSpinner,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Settings() {
  const [showSidebar, setShowSidebar] = useState(() => {
    return window.innerWidth >= 1024;
  });

  const { updateUserSettings, user } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: user?.email || '',
      currency: user?.currency || 'USD',
    },
  });

  const watchPassword = watch('password');

  // List of supported currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
    { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
    { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: '£' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
    { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Prepare update data - only include changed fields
      const updateData = {};

      if (data.email && data.email !== user?.email) {
        updateData.email = data.email;
      } else {
        updateData.email = '';
      }

      if (data.password && data.currentPassword) {
        updateData.password = data.password;
        updateData.currentPassword = data.currentPassword;
      } else {
        // If password is not provided, ensure it's not sent in the update
        updateData.password = '';
        updateData.currentPassword = '';
      }

      if (data.currency && data.currency !== user?.currency) {
        updateData.currency = data.currency;
      } else {
        updateData.currency = user?.currency;
      }

      // Call API to update settings
      const result = await updateUserSettings(updateData);

      if (result.success) {
        setSubmitSuccess(true);
        // Clear password fields after successful update
        reset({
          email: data.email,
          currency: data.currency,
          password: '',
          confirmPassword: '',
        });

        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Settings update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="dashboard-container flex flex-col bg-gray-50 min-h-screen">
        <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />

        <div className="flex min-h-screen">
          <Sidebar showSidebar={showSidebar} />
          <div className="flex-1 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8 animate-fadeIn">
                <h1 className="text-xl font-bold text-gray-900 mb-2 lg:text-3xl">
                  Hello - {user?.name}
                </h1>
                <p className="text-gray-600 text-xs lg:text-sm">
                  Manage your account preferences and security
                </p>
              </div>

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-slideDown">
                  <FaCheck className="text-green-600" />
                  <span className="text-green-800 font-medium">
                    Settings updated successfully!
                  </span>
                </div>
              )}

              {/* Settings Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Email Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 text-xs lg:text-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MdEmail className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <h2 className="text-[1.2em] lg:text-lg font-semibold text-gray-900">
                        Email Address
                      </h2>
                      <p className="text-gray-600 text-xs lg:text-base">
                        Update your email address
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg   transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter your email address"
                        />
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 text-xs lg:text-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <FaLock className="text-red-600 text-lg" />
                    </div>
                    <div>
                      <h2 className="text-[1.2em] lg:text-lg font-semibold text-gray-900">
                        Change Password
                      </h2>
                      <p className="text-gray-600 text-xs lg:text-base">
                        Leave blank to keep current password
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 flex-col">
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          {...register('currentPassword', {
                            minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters',
                            },
                          })}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg  transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-[10px] lg:placeholder:text-base"
                          placeholder="Enter current password"
                        />
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-4 flex-col md:flex-row">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            {...register('password', {
                              minLength: {
                                value: 6,
                                message:
                                  'Password must be at least 6 characters',
                              },
                            })}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg  transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-[10px] lg:placeholder:text-base"
                            placeholder="Enter new password"
                          />
                          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            {...register('confirmPassword', {
                              validate: (value) =>
                                !watchPassword ||
                                value === watchPassword ||
                                'Passwords do not match',
                            })}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg  transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-[10px] lg:placeholder:text-base"
                            placeholder="Confirm new password"
                          />
                          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Currency Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 text-xs lg:text-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FaDollarSign className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <h2 className="text-sm lg:text-xl font-semibold text-gray-900">
                        Currency Preference
                      </h2>
                      <p className="text-gray-600 text-s lg:text-sm">
                        Select your preferred currency for transactions
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Currency
                    </label>
                    <div className="relative">
                      <select
                        {...register('currency', {
                          required: 'Please select a currency',
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg  transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name} ({currency.symbol}
                            )
                          </option>
                        ))}
                      </select>
                      <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.currency && (
                      <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                        {errors.currency.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        Update Settings
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
