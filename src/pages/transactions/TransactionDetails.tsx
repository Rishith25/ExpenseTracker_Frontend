/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import TransactionCreate from "./TransactionCreate";
import { fetchTransactions } from "../../context/transactions/actions";
import {
  useTransactionsDispatch,
  useTransactionsState,
} from "../../context/transactions/context";
import { useAccountsDispatch } from "../../context/accounts/context";
import { fetchAccounts } from "../../context/accounts/actions";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";
import TransactionEditForm from "./TransactionEditForm";

const formatDateForPicker = (isoDate: string, i18n: any) => {
  const dateObj = new Date(isoDate);

  if (isNaN(dateObj.getTime())) {
    // If it's an invalid date, return an empty string or handle the error accordingly
    return "";
  }

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

const TransactionDetails = () => {
  const { t, i18n } = useTranslation();

  const accountsDispatch = useAccountsDispatch();

  const transactionsState: any = useTransactionsState();
  const transactionsDispatch = useTransactionsDispatch();

  const { transactions } = transactionsState || {};

  useEffect(() => {
    fetchAccounts(accountsDispatch);
    fetchTransactions(transactionsDispatch);
  }, [accountsDispatch, transactionsDispatch]);

  async function handleDelete(id: string): Promise<void> {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(`${API_ENDPOINT}/account/transaction/${id}`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      console.log(`Transaction with ID ${id} deleted successfully.`);
      fetchTransactions(transactionsDispatch);
      fetchAccounts(accountsDispatch);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("Transaction Details")}
        </h1>
        <div className="ml-auto items-end">
          <TransactionCreate />
        </div>
      </div>

      {transactions && transactions.isLoading ? (
        <p>{t("Loading...")}</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 overflow-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t("Category")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t("Amount")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t("Date")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t("Type")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t("Mode of Payment")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t("Description")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t("Attachment")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t("Actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions &&
              transactions.map(
                (transaction: {
                  id: string;
                  category: string;
                  account_no: number;
                  transaction_type: string;
                  timestamp: string;
                  amount: number;
                  mode_of_payment: string;
                  description: string;
                  attachment: string;
                }) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`font-medium ${
                          transaction.transaction_type === "expense"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {transaction.transaction_type === "expense"
                          ? "- "
                          : "+ "}
                        ₹{transaction.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateForPicker(transaction.timestamp, i18n)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {t(`${transaction.transaction_type}`)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.mode_of_payment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.attachment && (
                        <a
                          href={transaction.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {t("View Attachment")}
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                        <TransactionEditForm transaction={transaction} />
                      </div>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionDetails;
