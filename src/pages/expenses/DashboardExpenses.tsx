/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../../context/transactions/actions";
import {
  useTransactionsDispatch,
  useTransactionsState,
} from "../../context/transactions/context";
import { fetchAccounts } from "../../context/accounts/actions";
import { useAccountsDispatch } from "../../context/accounts/context";
import { useTranslation } from "react-i18next";
import { Transaction } from "../../context/transactions/reducer";

const formatDateForPicker = (isoDate: string, i18n: any): string => {
  const dateObj = new Date(isoDate);

  let localeObject: string;
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

  return dateFormatter.format(dateObj);
};

const DashboardExpenses: React.FC = () => {
  const { t, i18n } = useTranslation();

  const accountsDispatch = useAccountsDispatch();

  const transactionsState = useTransactionsState();
  const transactionsDispatch = useTransactionsDispatch();

  const { transactions } = transactionsState || {};

  const [groupedTransactions, setGroupedTransactions] = useState<{
    [date: string]: Transaction[];
  }>({});

  useEffect(() => {
    fetchAccounts(accountsDispatch);
    fetchTransactions(transactionsDispatch);
  }, [accountsDispatch, transactionsDispatch]);

  useEffect(() => {
    if (transactions) {
      const sortedTransactions = transactions.sort((a, b) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });

      // Slice the sorted transactions array to get only the past 5 transactions
      const pastTransactions = sortedTransactions.slice(0, 5);

      const grouped = pastTransactions.reduce((acc, transaction) => {
        const date = formatDateForPicker(transaction.timestamp, i18n);
        acc[date] = acc[date] || [];
        acc[date].push(transaction);
        return acc;
      }, {} as { [date: string]: Transaction[] });

      setGroupedTransactions(grouped);
    }
  }, [transactions, i18n]);

  return (
    <div className="flex flex-col justify-between max-w-3xl mx-auto mt-1 shadow-md rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold bg-blue-500 text-white py-2 px-4 rounded-t-lg">
          {t("Latest Transactions")}
        </h2>
        <table className="w-full whitespace-nowrap ">
          <thead className="bg-gray-100">
            <tr>
              <th className=" py-1">Account Number</th>
              <th className="px-1 py-1">Amount</th>
              <th className="px-1 py-1">Category</th>
            </tr>
          </thead>
        </table>
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date} className="mb-2 p-1">
            <h3 className="text font-semibold mb-1">{date}</h3>
            <div className="overflow-hidden border rounded-lg">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="bg-white mb-2">
                      <td className="px-4 py-2">{transaction.account_no}</td>
                      <td className="px-4 py-2">₹{transaction.amount}</td>
                      <td className="px-4 py-2">{transaction.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardExpenses;
