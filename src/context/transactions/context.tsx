/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  TransactionsState,
  TransactionsActions,
} from "./reducer";

const TransactionsStateContext = createContext<TransactionsState | undefined>(
  undefined
);

type TransactionsDispatch = React.Dispatch<TransactionsActions>;
const TransactionsDispatchContext = createContext<
  TransactionsDispatch | undefined
>(undefined);

export const TransactionsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TransactionsStateContext.Provider value={state}>
      <TransactionsDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionsDispatchContext.Provider>
    </TransactionsStateContext.Provider>
  );
};
export const useTransactionsState = () => useContext(TransactionsStateContext);
export const useTransactionsDispatch = () =>
  useContext(TransactionsDispatchContext);
