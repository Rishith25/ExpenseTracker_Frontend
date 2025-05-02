import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import AccountLayout from "../layout/account";
import Dashboard from "../pages/dashboard";
import Logout from "../pages/logout";
import ProtectedRoute from "./ProtectedRoute";
import AccountDetails from "../pages/account/AccountDetails";
import TransactionDetails from "../pages/transactions/TransactionDetails";
import AnalyticsDetails from "../pages/analysis/AnalyticsDetails";
import ProfileDetails from "../pages/profile/ProfileDetails";
import About from "../pages/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "home",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "account",
        element: <AccountDetails />,
      },
      {
        path: "transaction",
        element: <TransactionDetails />,
      },
      {
        path: "analytics",
        element: <AnalyticsDetails />,
      },
      {
        path: "profile",
        element: <ProfileDetails />,
      },
      { path: "about", element: <About /> },
    ],
  },
]);

export default router;
