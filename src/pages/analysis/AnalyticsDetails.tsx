import { useEffect, useState } from "react";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import {
  useAnalyticsDispatch,
  useAnalyticsState,
} from "../../context/analytics/context";
import { fetchAnalytics } from "../../context/analytics/actions";
import { useAccountsDispatch } from "../../context/accounts/context";
import { fetchAccounts } from "../../context/accounts/actions";
import { useTranslation } from "react-i18next";

const AnalyticsDetails = () => {
  const [selectedChart, setSelectedChart] = useState("line");
  const analyticsState = useAnalyticsState();
  const analyticsDispatch = useAnalyticsDispatch();
  const { t } = useTranslation();

  const { expenses, incomes } = analyticsState || {};

  const accountsDispatch = useAccountsDispatch();
  console.log("This is branch");

  useEffect(() => {
    fetchAnalytics(analyticsDispatch)
      .then(() => console.log("Data fetched successfully"))
      .catch((error) => console.error("Error fetching data:", error));
    fetchAccounts(accountsDispatch);
  }, [analyticsDispatch, accountsDispatch]);

  // Check if expenses and incomes are fetched correctly
  if (!expenses || !incomes) {
    return <div>Loading...</div>;
  }

  // Extracting month labels from income and expense data
  const incomeMonths = incomes.map((data) => data.month);
  const expenseMonths = expenses.map((data) => data.month);

  // Merging unique month labels from both income and expense data
  const allMonths = Array.from(new Set([...incomeMonths, ...expenseMonths]));

  const sortedMonths = allMonths.sort((a, b) => {
    // Convert month names to their corresponding numeric values for comparison
    const monthNumA = new Date(`${a} 1, 2000`).getMonth() + 1;
    const monthNumB = new Date(`${b} 1, 2000`).getMonth() + 1;
    return monthNumA - monthNumB;
  });

  // Aligning income and expense data based on month labels
  const incomeData = sortedMonths.map((month) => {
    const income = incomes.find((data) => data.month === month);
    return income ? income.total_amount : 0;
  });

  const expenseData = sortedMonths.map((month) => {
    const expense = expenses.find((data) => data.month === month);
    return expense ? expense.total_amount : 0;
  });

  const userData = {
    labels: sortedMonths,
    datasets: [
      {
        label: `${t("Income")}`,
        data: incomeData,
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
        pointRadius: 1,
        pointHoverRadius: 5,
      },
      {
        label: `${t("Expenses")}`,
        data: expenseData,
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
        pointRadius: 1,
        pointHoverRadius: 1,
      },
    ],
  };

  return (
    <div className="w-full rounded-lg p-4">
      <div className="flex justify-center items-center mb-2">
        <button
          className={`mr-2 px-3 py-1 rounded-3xl ${
            selectedChart === "line" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedChart("line")}
        >
          Line Chart
        </button>
        <button
          className={`px-3 py-1 rounded-3xl ${
            selectedChart === "bar" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedChart("bar")}
        >
          Bar Chart
        </button>
        {/* <button
          className={`ml-2 px-3 py-1 rounded ${
            selectedChart === "pie" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedChart("pie")}
        >
          Pie Chart
        </button> */}
      </div>
      <div className="mx-auto">
        {selectedChart === "line" && <LineChart chartData={userData} />}
        {selectedChart === "bar" && <BarChart chartData={userData} />}
        {/* {selectedChart === "pie" && <PieChart chartData={userData} />} */}
      </div>
    </div>
  );
};

export default AnalyticsDetails;
