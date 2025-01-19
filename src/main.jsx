import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import DashboardHome from "./Components/Dashboard/DashboardHome";
import DashboardOverview from "./Components/Dashboard/DashboardOverview";
import TransactionManagement from "./Components/Transactions/Transaction";
import { StrictMode } from "react";
import "./index.css";
import Reports from "./Components/Reports/Reports";
import Budgets from "./Components/Budgets/Budgets";
import Settings from "./Components/settings/Settings";
import PasswordResetForm from "./Components/Authentication/ResetPassword";
import Profile from "./Components/profile/profile";
import { AuthProvider } from "./Components/authcontext/AuthContext";
import PrivateRoute from "./Components/authcontext/private";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset", element: <PasswordResetForm /> },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardHome />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardOverview /> },
      {
        path: "transactions",
        element: (
          <PrivateRoute>
            <TransactionManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },
      {
        path: "budgets",
        element: (
          <PrivateRoute>
            <Budgets />
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
