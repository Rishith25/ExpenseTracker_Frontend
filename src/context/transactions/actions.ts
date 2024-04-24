/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";

export const fetchTransactions = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_TRANSACTIONS_REQUEST" });

    const response = await axios.get(`${API_ENDPOINT}/account/transaction`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const data = response.data;
    data.sort((a: any, b: any) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateB - dateA; // descending order, change to dateA - dateB for ascending
    });

    dispatch({ type: "FETCH_TRANSACTIONS_SUCCESS", payload: data });
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    // Dispatch an action with an error message for better error handling
    dispatch({ type: "FETCH_TRANSACTIONS_FAILURE", payload: error.message });
  }
};

export const addTransactions = async (dispatch: any, transactionData: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  console.log(transactionData);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${API_ENDPOINT}/account/transaction`,
      transactionData,
      config
    );
    const newTransaction = response.data;
    console.log(newTransaction);
    dispatch({ type: "ADD_TRANSACTIONS_SUCCESS", payload: newTransaction });
    return { ok: true };
  } catch (error: any) {
    console.error("Error adding transaction:", error);
    console.error(
      "Transaction creation failed:",
      error.response?.data || error.message
    );

    // Dispatch an action with an error message for better error handling
    // dispatch({ type: "ADD_TRANSACTIONS_FAILURE", payload: error.message });
  }
};
