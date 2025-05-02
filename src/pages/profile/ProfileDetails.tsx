/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  useAccountsState,
  useAccountsDispatch,
} from "../../context/accounts/context";
import {
  useTransactionsState,
  useTransactionsDispatch,
} from "../../context/transactions/context";
import { fetchAccounts } from "../../context/accounts/actions";
import { fetchTransactions } from "../../context/transactions/actions";
import { useTranslation } from "react-i18next";

const ProfileDetails = () => {
  const { t } = useTranslation();
  const accountsState: any = useAccountsState();
  const { accounts } = accountsState || {};
  const accountsDispatch = useAccountsDispatch();

  const transactionsState: any = useTransactionsState();
  const transactionsDispatch = useTransactionsDispatch();
  const { transactions } = transactionsState || {};

  const expenses = transactions.filter(
    (transaction: { transaction_type: string }) =>
      transaction.transaction_type === "expense"
  );

  // Fetch accounts and transactions on component mount
  useEffect(() => {
    fetchAccounts(accountsDispatch);
    fetchTransactions(transactionsDispatch);
  }, [accountsDispatch, transactionsDispatch]);

  // Calculate total balance
  function calculateTotalBalance(accounts: any) {
    let totalBalance = 0;
    for (const account of accounts) {
      totalBalance += parseFloat(account.balance);
    }
    return totalBalance.toFixed(2); // Ensure total balance is rounded to 2 decimal places
  }

  // Calculate total expenses
  function calculateTotalExpenses(expenses: any) {
    let totalExpense = 0;
    for (const expense of expenses) {
      totalExpense += parseFloat(expense.amount);
    }
    return totalExpense.toFixed(2); // Ensure total expenses are rounded to 2 decimal places
  }

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex justify-center items-center mb-4 mx-auto">
              {/* SVG Profile Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a5 5 0 10-.001 10.001A5 5 0 0012 2zm0 12c-4.418 0-8 2.686-8 6v2h16v-2c0-3.314-3.582-6-8-6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <div className="text-left">
            <p className="mb-2">
              <strong className="font-semibold">{t("Phone Number")}:</strong>{" "}
              {user.phone_number}
            </p>
            <p className="mb-2">
              <strong className="font-semibold">{t("Balance")}:</strong> ₹{" "}
              {calculateTotalBalance(accounts)}
            </p>
            <p className="mb-2">
              <strong className="font-semibold">{t("Expenses")}:</strong> ₹{" "}
              {calculateTotalExpenses(expenses)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center">No user data available</p>
      )}
    </div>
  );
};

export default ProfileDetails;
