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
      <div className="px-4 sm:px-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          {t("Dashboard")}
        </h2>
        <div className="flex justify-end mt-4">
          <AccountCreate />
        </div>
        <div className="flex flex-wrap mt-8">
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
            <div className="w-full mt-8 sm:mt-0 px-4 sm:px-0">
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="suspense-loading">{t("Loading...")}</div>
                  }
                >
                  <Analytics />
                </Suspense>
              </ErrorBoundary>
            </div>
            <div className="w-full mt-8 px-4 sm:px-0">
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
          <div className="w-full sm:w-1/3 mt-8 sm:mt-0">
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
      </div>
    </>
  );
};

export default Dashboard;
