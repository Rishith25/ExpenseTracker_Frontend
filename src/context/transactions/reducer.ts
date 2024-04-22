import Transaction from "../../pages/transactions";

// Interface for Transactions
export interface Transaction {
  id: number;
  account_no: number;
  category: string;
  amount: number;
  timestamp: string;
  transaction_type: string;
  mode_of_payment: string;
  description: string;
  attachment: string;
}

// Interface for Transaction State
export interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

// Initial State for Transactions
export const initialState: TransactionsState = {
  transactions: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Actions for Transactions
export type TransactionsActions =
  | { type: "FETCH_TRANSACTIONS_REQUEST" }
  | { type: "FETCH_TRANSACTIONS_SUCCESS"; payload: Transaction[] }
  | { type: "FETCH_TRANSACTIONS_FAILURE"; payload: string }
  | { type: "ADD_TRANSACTIONS_REQUEST" }
  | { type: "ADD_TRANSACTIONS_SUCCESS"; payload: Transaction }
  | { type: "ADD_TRANSACTIONS_FAILURE"; payload: string };

// Reducer for Transactions
export const reducer = (
  state: TransactionsState = initialState,
  action: TransactionsActions
): TransactionsState => {
  switch (action.type) {
    case "FETCH_TRANSACTIONS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_TRANSACTIONS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        transactions: action.payload,
      };
    case "FETCH_TRANSACTIONS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    // case "ADD_TRANSACTIONS_REQUEST":
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    case "ADD_TRANSACTIONS_SUCCESS":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    // case "ADD_TRANSACTIONS_FAILURE":
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: true,
    //     errorMessage: action.payload,
    //   };
    default:
      return state;
  }
};
