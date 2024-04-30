/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import AccountLayout from "../layout/account";
import Dashboard from "../pages/dashboard";
import Logout from "../pages/logout";
import ProtectedRoute from "./ProtectedRoute";
import AccountDetails from "../pages/account/AccountDetails";
import TransactionDetails from "../pages/transactions/TransactionDetails";
import AnalyticsDetails from "../pages/analysis/AnalyticsDetails";

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
        // children: [
        //   {
        //     index: true,
        //     element: <TransactionDetails/>
        //   },
        //   {
        //     path: ':transactionID',
        //     children: [
        //       {
        //         path: "edit",
        //         element: (
        //           <TransactionEditForm/>
        //         )
        //       }

        //     ]
        //   }
        // ],
      },
      {
        path: "analytics",
        element: <AnalyticsDetails />,
      },
    ],
  },
  // {
  //   path: "account",
  //   element: <AccountLayout />,
  //   children: [
  //     {
  //       path: "news",
  //       children: [
  //         { index: true, element: <Articles /> },
  //         {
  //           path: ":articleID",
  //           children: [{ index: true, element: <ArticleDetails /> }],
  //         },
  //       ],
  //     },
  //     {
  //       path: "matches",
  //       children: [
  //         { index: true, element: <Matches /> },
  //         {
  //           path: ":matchID",
  //           children: [{ index: true, element: <MatchDetails /> }],
  //         },
  //       ],
  //     },
  //     {
  //       path: "profile",
  //       element: (
  //         <ProtectedRoute>
  //           <ProfileIndex />
  //         </ProtectedRoute>
  //       ),
  //     },

  //     {
  //       path: "changePassword",
  //       element: (
  //         <ProtectedRoute>
  //           <ChangePasswordIndex />
  //         </ProtectedRoute>
  //       ),
  //     },
  //   ],
  // },
  // {
  //   path: "favorites",
  //   element: (
  //     <ProtectedRoute>
  //       <FavoritesIndex />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     {
  //       path: "news",
  //       children: [
  //         {
  //           path: ":articleID",
  //           element: <ArticleDetailsIndex />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "matches",
  //       children: [
  //         { index: true, element: <Matches /> },
  //         {
  //           path: ":matchID",
  //           children: [{ index: true, element: <MatchDetails /> }],
  //         },
  //       ],
  //     },
  //     {
  //       path: "changePassword",
  //       element: <ChangePasswordIndex />,
  //     },
  //   ],
  // },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

export default router;
