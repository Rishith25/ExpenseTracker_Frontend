/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  useAccountsDispatch,
  useAccountsState,
} from "../../context/accounts/context";
import { fetchAccounts } from "../../context/accounts/actions";
import AccountCreate from "./AccountCreate";
import { useTranslation } from "react-i18next";

/* eslint-disable @typescript-eslint/no-unused-vars */
const AccountDetails: React.FC = () => {
  const accountsState: any = useAccountsState();
  const accountsDispatch = useAccountsDispatch();

  const { accounts, isLoading } = accountsState || {};
  const { t } = useTranslation();

  useEffect(() => {
    fetchAccounts(accountsDispatch);
  }, [accountsDispatch]);

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
                <tr key={account.account_no}>
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
                </tr>
              </tbody>
            )
          )}
      </table>
    </>
  );
};

export default AccountDetails;
