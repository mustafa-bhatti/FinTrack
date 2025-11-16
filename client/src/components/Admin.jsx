import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
import {
  FaUsers,
  FaChartBar,
  FaUserShield,
  FaTrash,
  FaEye,
  FaCrown,
  FaUserMinus,
  FaChartLine,
  FaCashRegister,
} from 'react-icons/fa';

export default function Admin() {
  const {
    user,
    getAppStats,
    isAdmin,
    fetchUsers,
    deleteUserbyAdmin,
    updateUserbyAdmin,
    adminRefresh,
  } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(() => {
    return window.innerWidth >= 1024;
  });

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    if (!isAdmin) return;
    else {
      const fetchStats = async () => {
        const responseStats = await getAppStats();
        const responseUsers = await fetchUsers();
        if (responseUsers?.success) {
          setUsers(responseUsers.users);
        }
        console.log('running', responseStats);
        if (responseStats?.success) {
          setStats(responseStats.stats);
        } else {
          console.error('Failed to fetch app stats');
        }
      };
      fetchStats();
    }
  }, [isAdmin, getAppStats, adminRefresh]);

  const handleDeleteUser = async (userId) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        const response = await deleteUserbyAdmin(userId);
        if (response?.success) {
          console.log('User Deleted Succesfully');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleUserRoleToggle = async (userId, isCurrentlyAdmin) => {
    try {
      console.log("IsADmin: ",isCurrentlyAdmin)
      const response = await updateUserbyAdmin(userId, !isCurrentlyAdmin);
      if (response?.success) {
        console.log(response.message);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  return (
    <div className="dashboard-container flex flex-col">
      <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="flex min-h-screen">
        <Sidebar showSidebar={showSidebar} />

        <div className="flex-1 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage users and monitor application statistics
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setSelectedTab('overview')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === 'overview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setSelectedTab('users')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === 'users'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    User Management
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            {selectedTab === 'overview' && stats && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <FaUsers className="text-blue-600 text-2xl mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold">{stats.totalUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <FaUserShield className="text-green-600 text-2xl mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">Admin Users</p>
                        <p className="text-2xl font-bold">
                          {stats.totalAdmins}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <FaChartBar className="text-purple-600 text-2xl mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Total Transactions
                        </p>
                        <p className="text-2xl font-bold">
                          {stats.totalTransactions}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <FaUsers className="text-orange-600 text-2xl mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">New Users (30d)</p>
                        <p className="text-2xl font-bold">
                          {stats.recentUsers}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* income transactions */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <FaCashRegister className="text-green-600 text-2xl mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Total Income Transactions
                        </p>
                        <p className="text-2xl font-bold">
                          {stats.incomeTransactions}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* expense transactions */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <FaCashRegister className="text-red-600 text-2xl mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Total Expense Transactions
                        </p>
                        <p className="text-2xl font-bold">
                          {stats.expenseTransactions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'users' && (
              <div className="bg-white rounded-lg shadow">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((userData) => (
                        <tr key={userData._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {userData.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {userData.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                userData.isAdmin
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {userData.isAdmin ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(userData.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {userData._id !== user.id && (
                              <>
                                <button
                                  onClick={() =>
                                    handleUserRoleToggle(
                                      userData._id,
                                      userData.isAdmin
                                    )
                                  }
                                  className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
                                    userData.isAdmin
                                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                  }`}
                                >
                                  {userData.isAdmin ? (
                                    <>
                                      <FaUserMinus className="mr-1" />
                                      Remove Admin
                                    </>
                                  ) : (
                                    <>
                                      <FaCrown className="mr-1" />
                                      Make Admin
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => handleDeleteUser(userData._id)}
                                  className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200"
                                >
                                  <FaTrash className="mr-1" />
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
