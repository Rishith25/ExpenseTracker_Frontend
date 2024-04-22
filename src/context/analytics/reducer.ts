/* eslint-disable @typescript-eslint/no-unused-vars */

export interface Analytics {
  year: number;
  month: number;
  total_amount: number;
  num_transactions: number;
}

export const initialState: AnalyticsState = {
  expenses: [],
  incomes: [],
  isLoading: false,
  isError: false,
  errorMessage: "Hello",
};

export interface AnalyticsState {
  expenses: Analytics[];
  incomes: Analytics[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type AnalyticsActions =
  | { type: "FETCH_ANALYTICS_REQUEST" }
  | { type: "FETCH_ANALYTICS_SUCCESS"; payload: AnalyticsState }
  | { type: "FETCH_ANALYTICS_FAILURE"; payload: string };

export const reducer = (
  state: AnalyticsState = initialState,
  action: AnalyticsActions
): AnalyticsState => {
  switch (action.type) {
    case "FETCH_ANALYTICS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ANALYTICS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        expenses: action.payload.expenses,
        incomes: action.payload.incomes,
      };
    case "FETCH_ANALYTICS_FAILURE":
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
