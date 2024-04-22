import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import Balance from "../balance";
import Expense from "../expenses";
import Analytics from "../analysis";
import AccountCreate from "../account/AccountCreate";
import LastPaymentDetails from "../expenses/LastPayments";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 px-10">
        {t("Dashboard")}
      </h2>
      <AccountCreate />
      <div className="flex flex-wrap">
        <div className="w-2/3">
          <div className="bg-white flex flex-wrap">
            {/* <h3 className="text-xl text-black font-semibold">Account Summary</h3> */}
            <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
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
            <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
              {/* <h3 className="text-xl text-black font-semibold">Account Summary</h3> */}
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
          <div className="w-full p-4 px-16 flex justify-center items-center">
            {/* <h3 className="text-xl text-black font-semibold">Account Summary</h3> */}
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
          <LastPaymentDetails />
        </div>
        <div className="w-1/3">Hello</div>
      </div>
    </>
  );
};

export default Dashboard;
