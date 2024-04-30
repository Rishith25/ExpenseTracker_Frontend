/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  useAccountsDispatch,
  useAccountsState,
} from "../../context/accounts/context";
import { fetchAccounts } from "../../context/accounts/actions";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";
const AccountCreate = React.lazy(() => import("./AccountCreate"));
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountEditForm from "./AccountEditCreate";

/* eslint-disable @typescript-eslint/no-unused-vars */
const AccountDetails: React.FC = () => {
  const accountsState: any = useAccountsState();
  const accountsDispatch = useAccountsDispatch();

  const { accounts, isLoading } = accountsState || {};
  const { t } = useTranslation();

  console.log("This is Main branch");
  console.log("This is branch commit");

  useEffect(() => {
    fetchAccounts(accountsDispatch);
  }, [accountsDispatch]);

  async function handleDelete(id: string): Promise<void> {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(`${API_ENDPOINT}/account/${id}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      console.log(`Transaction with ID ${id} deleted successfully.`);
      fetchAccounts(accountsDispatch);
      toast.success("Account Deleted successfully", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  if (isLoading) {
    return <>{t("Loading...")}</>;
  }
  return (
    <>
      <div className="px-6 py-3">
        <AccountCreate />
      </div>

      <table className="min-w-full divide-y divide-gray-200 shadow-md bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {t("Account Number")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {t("Balance")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {t("Bank Name")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {t("Default")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {t("Actions")}
            </th>
          </tr>
        </thead>

        {accounts &&
          accounts.map(
            (account: {
              is_default: boolean;
              account_no: string;
              balance: number;
              bank_name: string;
            }) => (
              <tbody
                className="divide-y divide-gray-200"
                key={account.account_no}
              >
                <tr key={account.account_no} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {`${account.account_no}`.slice(0, 4) +
                      " " +
                      "X".repeat(`${account.account_no}`.length - 4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ₹{account.balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {account.bank_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {account.is_default ? (
                      <span className="inline-block bg-yellow-400 text-white text-xs font-semibold rounded-full py-1 px-2 uppercase tracking-wide">
                        {t("Default")}
                      </span>
                    ) : (
                      <span className="inline-block bg-gray-300 text-gray-600 text-xs font-semibold rounded-full py-1 px-2 uppercase tracking-wide">
                        {t("Not Default")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center">
                    <button
                      onClick={() => handleDelete(account.account_no)}
                      className="text-red-600 hover:text-red-900 mr-2"
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
                    <AccountEditForm account={account} />
                  </td>
                </tr>
              </tbody>
            )
          )}
      </table>
    </>
  );
};

export default AccountDetails;
