/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  AccountsState,
  AccountsActions,
} from "./reducer";

const AccountsStateContext = createContext<AccountsState | undefined>(
  undefined
);

type AccountsDispatch = React.Dispatch<AccountsActions>;
const AccountsDispatchContext = createContext<AccountsDispatch | undefined>(
  undefined
);

export const AccountsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AccountsStateContext.Provider value={state}>
      <AccountsDispatchContext.Provider value={dispatch}>
        {children}
      </AccountsDispatchContext.Provider>
    </AccountsStateContext.Provider>
  );
};
export const useAccountsState = () => useContext(AccountsStateContext);
export const useAccountsDispatch = () => useContext(AccountsDispatchContext);
