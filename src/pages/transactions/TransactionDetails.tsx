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

  return (
    <div className="container mx-auto">
      <TransactionCreate />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {t("Transaction Details")}
      </h1>
      {transactions && transactions.isLoading ? (
        <p>{t("Loading...")}</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions &&
              transactions.map(
                (transaction: {
                  id: string;
                  category: string;
                  transaction_type: string;
                  timestamp: string;
                  amount: number;
                  mode_of_payment: string;
                  description: string;
                  attachment: string;
                }) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span
                        className={`text-gray-900 ${
                          transaction.transaction_type === "expense"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {transaction.transaction_type === "expense"
                          ? `- ₹${transaction.amount}`
                          : `+ ₹${transaction.amount}`}
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
