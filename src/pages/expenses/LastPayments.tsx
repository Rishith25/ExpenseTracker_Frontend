/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { fetchTransactions } from "../../context/transactions/actions";
import {
  useTransactionsDispatch,
  useTransactionsState,
} from "../../context/transactions/context";
import { fetchAccounts } from "../../context/accounts/actions";
import { useAccountsDispatch } from "../../context/accounts/context";
import { useTranslation } from "react-i18next";

const formatDateForPicker = (isoDate: string, i18n: any) => {
  const dateObj = new Date(isoDate);

  let localeObject;
  switch (i18n.language) {
    case "es":
      localeObject = "fr-ES";
      break;
    case "gr":
      localeObject = "el-GR";
      break;
    default:
      localeObject = "en-US";
  }

  const dateFormatter = new Intl.DateTimeFormat(localeObject, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDate = dateFormatter.format(dateObj);
  return formattedDate;
};

const LastPaymentDetails = () => {
  const { t, i18n } = useTranslation();

  const accountsDispatch = useAccountsDispatch();

  const transactionsState = useTransactionsState();
  const transactionsDispatch = useTransactionsDispatch();

  const { transactions } = transactionsState || {};

  useEffect(() => {
    fetchAccounts(accountsDispatch);
    fetchTransactions(transactionsDispatch);
  }, [accountsDispatch, transactionsDispatch]);

  // Function to calculate the last three expenses
  const getLastThreeExpenses = () => {
    if (!transactions || transactions.length === 0) return [];
    // Assuming transactions are sorted by date in descending order
    const expenses = transactions
      .filter((transaction) => transaction.transaction_type === "expense")
      .slice(0, 2)
      .map((expense) => {
        return {
          ...expense,
        };
      });
    return expenses;
  };

  const lastThreeExpenses = getLastThreeExpenses();

  return (
    <div className="max-w-3xl mx-auto mt-8 shadow-md rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold bg-blue-500 text-white py-4 px-6 rounded-t-2xl">
          {t("Last Payments")}
        </h2>
        <table className="table-auto w-full border-collapse rounded-2xl bg-white">
          <tbody>
            {lastThreeExpenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="px-4 py-3 text-gray-700">
                  {expense.account_no}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {formatDateForPicker(expense.timestamp, i18n)}
                </td>
                <td className="px-4 py-3 text-gray-700">${expense.amount}</td>
                <td className="px-4 py-3 text-gray-700">{expense.category}</td>
                <td className="px-4 py-3 text-gray-700">
                  {expense.attachment ? (
                    <a
                      href={expense.attachment}
                      className="text-blue-500 text-lg"
                    >
                      ...
                    </a>
                  ) : (
                    `N/A`
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastPaymentDetails;
