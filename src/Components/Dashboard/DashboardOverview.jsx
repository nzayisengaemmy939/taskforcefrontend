import React, { useEffect, useState } from "react";
import { getTransactions } from "../../api service/transactions/transaction";
import { CircularProgress } from "@mui/material";
import { registerTransactions } from "../../api service/transactions/transaction";
import "react-toastify/dist/ReactToastify.css";
import { getProfile, resetPassword } from "../../api service/auth/auth";
import { getReport } from "../../api service/transactions/transaction";
import { getExpenseReport } from "../../api service/transactions/transaction";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { TrendingUp, TrendingDown, DollarSign, Search } from "lucide-react";

const expenseCategories = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Shopping", value: 300 },
  { name: "Bills", value: 200 },
  { name: "Entertainment", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6347"]; 

const DashboardOverview = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");

  const [transactions, setTransactions] = useState([]);
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reportExpense, setExpenseReport] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [error] = useState("");
  useEffect(() => {
    getTransactions(setTransactions, setIsLoading);
  }, []);
  useEffect(() => {
    getReport(setReport);
  }, []);
  useEffect(() => {
    getExpenseReport(setExpenseReport);
  });
  const categories = reportExpense.map((categoryData) => ({
    name: categoryData.category,
    value: categoryData.totalExpense,
    percent: categoryData.avgPercentage,
  }));
  const monthlyData = report.map((data) => ({
    month: data.month,
    income: data.totalIncome,
    expenses: data.totalExpense,
  }));
  
  const totalIncome = monthlyData.reduce((sum, data) => sum + data.income, 0);
  const totalExpenses = monthlyData.reduce((sum, data) => sum + data.expenses, 0);
  const currentBalance = totalIncome - totalExpenses;


  
  const StatCard = ({ title, amount, icon: Icon, trend,style }) => (
    <div className={`p-2 rounded shadow-sm mb-8 `} style={style}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <Icon className="text-gray-400" size={12} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg  text-gray-700">{amount.toLocaleString()}frw</p>
        {/* {trend && (
          <span
            className={`text-xs ${
              trend > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend > 0 ? "+" : ""}
            {trend}
          </span>
        )} */}
      </div>
    </div>
  );

  return (
    <div className="p-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 ">
        <StatCard
          title="Total Income"
          amount={totalIncome}
          icon={TrendingUp}
          trend={10}
          style={{ backgroundColor: "#D1FAE5" }}
        />

        <StatCard
          title="Expenses"
          amount={totalExpenses}
          icon={TrendingDown}
          trend={-5}
          style={{ backgroundColor: "#FDC4CB" }}
        />

        <StatCard
          title="Current Balance"
          amount={currentBalance}
          icon={DollarSign}
          style={{ backgroundColor: "#DBEAFE" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2 bg--">
        <div className="bg-white p-2 rounded shadow-sm ">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold">Income vs Expenses</h3>
            <p className="border rounded text-xs px-1 py-0.5">Yearly report</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 8 }} />
              <YAxis tick={{ fontSize: 8 }} />
              <Tooltip contentStyle={{ fontSize: "10px" }} />
              <Legend wrapperStyle={{ fontSize: "8px" }} />
              <Bar dataKey="income" fill="#4CAF50" />
              <Bar dataKey="expenses" fill="#FF5252" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-2 rounded shadow-sm">
          <h3 className="text-xs font-semibold mb-2">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent.toFixed(0)}%`}
                style={{ fontSize: "12px" }}
                outerRadius={50}
                fill="#8884d8"
                dataKey="value"
              >
                {categories.map((entry, index) => (
  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
))}

              </Pie>
              <Tooltip contentStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-2 rounded shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">
            Recent Transactions
          </h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-6 pr-2 py-0.5 border rounded text-xs w-24"
              />
              <Search
                className="absolute left-1 top-1 text-gray-400"
                size={12}
              />
            </div>
            <select className="border rounded text-xs px-1 py-0.5">
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="food">Food</option>
              <option value="bills">Bills</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <table className="min-w-full table-auto mt-4">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left text-gray-700">Date</th>
                    <th className="py-2 px-4 text-left text-gray-700">
                      Description
                    </th>
                    <th className="py-2 px-4 text-left text-gray-700">
                      Category
                    </th>
                    <th className="py-2 px-4 text-right text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-4 text-center text-gray-500"
                      >
                        No transactions available.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-1 px-2">
                          {format(new Date(transaction.date), "MM/dd/yy")}
                        </td>
                        <td className="py-1 px-2">{transaction.description}</td>
                        <td className="py-1 px-2">
                          <span
                            className={`px-1 py-0.5 rounded-full text-xs ${
                              transaction.category === "Income"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {transaction.category}
                          </span>
                        </td>
                        <td
                          className={`py-1 px-2 text-right ${
                            transaction.amount > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          ${Math.abs(transaction.amount).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
