/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchAnalytics = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ANALYTICS_REQUEST" });

    const response = await axios.get(
      `http://localhost:8000/api/account/analytics`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = response.data;

    dispatch({ type: "FETCH_ANALYTICS_SUCCESS", payload: data });
  } catch (error: any) {
    console.error("Error fetching accounts:", error);

    dispatch({ type: "FETCH_ANALYTICS_FAILURE" });
  }
};
