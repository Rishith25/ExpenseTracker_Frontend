/* eslint-disable @typescript-eslint/no-unused-vars */

export interface Accounts {
  account_no: number;
  balance: number;
  bank_name: string;
  is_default: boolean;
}

export const initialState: AccountsState = {
  accounts: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface AccountsState {
  accounts: Accounts[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type AccountsActions =
  | { type: "FETCH_ACCOUNTS_REQUEST" }
  | { type: "FETCH_ACCOUNTS_SUCCESS"; payload: Accounts[] }
  | { type: "FETCH_ACCOUNTS_FAILURE"; payload: string };

export const reducer = (
  state: AccountsState = initialState,
  action: AccountsActions
): AccountsState => {
  switch (action.type) {
    case "FETCH_ACCOUNTS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ACCOUNTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        accounts: action.payload,
      };
    case "FETCH_ACCOUNTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
