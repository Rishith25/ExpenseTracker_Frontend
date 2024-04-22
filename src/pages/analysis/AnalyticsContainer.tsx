import { useEffect } from "react";
import { useAnalyticsDispatch } from "../../context/analytics/context";
import { fetchAnalytics } from "../../context/analytics/actions";

const AnalyticsContainer = () => {
  const analyticsDispatch = useAnalyticsDispatch();
  useEffect(() => {
    fetchAnalytics(analyticsDispatch);
  }, [analyticsDispatch]);
  return null; // Or any other JSX if needed
};

export default AnalyticsContainer;
