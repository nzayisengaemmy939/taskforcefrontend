import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getTransactions } from '../../api service/transactions/transaction';

const Reports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [reportType, setReportType] = useState('summary');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions(setTransactions, setIsLoading);
  }, []);

  const sampleData = {
    accounts: ['Bank', 'Cash', 'Mobile Money'], // Assuming these come from your backend too
  };

  const summaryData = useMemo(() => {
    const filteredTransactions = transactions.filter(transaction => {
      const inDateRange = (!dateRange.start || transaction.date >= dateRange.start) &&
                         (!dateRange.end || transaction.date <= dateRange.end);
      const inAccounts = selectedAccounts.length === 0 || selectedAccounts.includes(transaction.account);
      return inDateRange && inAccounts;
    });

    const incomeData = filteredTransactions.filter(t => t.amount > 0);
    const expenseData = filteredTransactions.filter(t => t.amount < 0);

    return {
      totalIncome: incomeData.reduce((sum, t) => sum + t.amount, 0),
      totalExpenses: Math.abs(expenseData.reduce((sum, t) => sum + t.amount, 0)),
      categoryBreakdown: filteredTransactions.reduce((acc, t) => {
        const category = t.category;
        acc[category] = (acc[category] || 0) + Math.abs(t.amount);
        return acc;
      }, {}),
    };
  }, [dateRange, selectedAccounts, transactions]);

  const handleExport = () => {
    const doc = new jsPDF();
    // Title
    doc.setFontSize(18);
    doc.text('Detailed Financial Transactions', 20, 10);

    // Add table for transactions
    const tableData = transactions.map(transaction => [
      format(new Date(transaction.date), 'MM/dd/yyyy'),
      transaction.category,
      transaction.subCategory,
      transaction.account,
      `$${Math.abs(transaction.amount).toLocaleString()}`
    ]);

    doc.autoTable({
      head: [['Date', 'Category', 'Subcategory', 'Account', 'Amount']],
      body: tableData,
      startY: 20,
    });

    // Save PDF
    doc.save('transaction_report.pdf');
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Financial Reports</h1>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
          >
            <FileText size={16} className="mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date Range</label>
            <div className="flex flex-col gap-2">
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Accounts</label>
            <select
              multiple
              className="w-full px-3 py-2 border rounded-lg text-sm"
              value={selectedAccounts}
              onChange={(e) => setSelectedAccounts(Array.from(e.target.selectedOptions, option => option.value))}
            >
              {sampleData.accounts.map(account => (
                <option key={account} value={account}>{account}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Income vs Expenses Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold mb-4 text-blue-400">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Income', amount: summaryData.totalIncome },
              { name: 'Expenses', amount: summaryData.totalExpenses }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ fontSize: '12px' }} />
              <Bar dataKey="amount" fill="#4CAF50" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income and Expenses Breakdown Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold mb-4">Income and Expenses Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Income', value: summaryData.totalIncome },
                  { name: 'Expenses', value: summaryData.totalExpenses }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                style={{ fontSize: "12px" }}
              >
                {['Income', 'Expenses'].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#4CAF50' : '#FF6347'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {reportType === 'detailed' && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold mb-4">Detailed Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Subcategory</th>
                  <th className="px-4 py-2 text-left">Account</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{format(new Date(transaction.date), 'MM/dd/yyyy')}</td>
                    <td className="px-4 py-2">{transaction.category}</td>
                    <td className="px-4 py-2">{transaction.subCategory}</td>
                    <td className="px-4 py-2">{transaction.account}</td>
                    <td className="px-4 py-2 text-right">${Math.abs(transaction.amount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
