/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  AnalyticsState,
  AnalyticsActions,
} from "./reducer";

const AnalyticsStateContext = createContext<AnalyticsState | undefined>(
  undefined
);

type AnalyticsDispatch = React.Dispatch<AnalyticsActions>;
const AnalyticsDispatchContext = createContext<AnalyticsDispatch | undefined>(
  undefined
);

export const AnalyticsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AnalyticsStateContext.Provider value={state}>
      <AnalyticsDispatchContext.Provider value={dispatch}>
        {children}
      </AnalyticsDispatchContext.Provider>
    </AnalyticsStateContext.Provider>
  );
};
export const useAnalyticsState = () => useContext(AnalyticsStateContext);
export const useAnalyticsDispatch = () => useContext(AnalyticsDispatchContext);
