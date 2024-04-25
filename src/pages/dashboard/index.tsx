import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import Balance from "../balance";
import Expense from "../expenses";
import Analytics from "../analysis";
import AccountCreate from "../account/AccountCreate";
import LastPaymentDetails from "../expenses/LastPayments";
import { useTranslation } from "react-i18next";
import DashboardExpenses from "../expenses/DashboardExpenses";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 px-4 sm:px-10">
        {t("Dashboard")}
      </h2>
      <div className="flex justify-end px-4 sm:px-10">
        <AccountCreate />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-2/3">
          <div className="bg-white flex flex-wrap">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="suspense-loading">{t("Loading...")}</div>
                  }
                >
                  <Balance />
                </Suspense>
              </ErrorBoundary>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="suspense-loading">{t("Loading...")}</div>
                  }
                >
                  <Expense />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
          <div className="w-full p-4 px-8 sm:px-16 flex justify-center items-center">
            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="suspense-loading">{t("Loading...")}</div>
                }
              ></Suspense>
            </ErrorBoundary>
            <Analytics />
          </div>
          <div className="w-full px-8 sm:px-16">
            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="suspense-loading">{t("Loading...")}</div>
                }
              >
                <LastPaymentDetails />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
        <div className="w-full sm:w-1/3">
          <div className="w-full">
            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="suspense-loading">{t("Loading...")}</div>
                }
              >
                <DashboardExpenses />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
