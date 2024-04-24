/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";

export const fetchAccounts = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ACCOUNTS_REQUEST" });

    const response = await axios.get(`${API_ENDPOINT}/account`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = response.data;

    dispatch({ type: "FETCH_ACCOUNTS_SUCCESS", payload: data });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    dispatch({ type: "FETCH_ACCOUNTS_FAILURE" });
  }
};
