import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { AccountsProvider } from "./context/accounts/context";
import { TransactionsProvider } from "./context/transactions/context";
import { AnalyticsProvider } from "./context/analytics/context";
import { ToastContainer } from "react-toastify";
import "./i18n";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <AccountsProvider>
        <TransactionsProvider>
          <AnalyticsProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </AnalyticsProvider>
        </TransactionsProvider>
      </AccountsProvider>
    </div>
  );
};
export default App;
