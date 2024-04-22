import { useEffect } from "react";
import { useAccountsDispatch } from "../../context/accounts/context";
import { fetchAccounts } from "../../context/accounts/actions";
import { Outlet } from "react-router-dom";

const AccountContainer = () => {
  const dispatchAccounts = useAccountsDispatch();
  useEffect(() => {
    fetchAccounts(dispatchAccounts);
  }, [dispatchAccounts]);
  return <Outlet />; // Or any other JSX if needed
};

export default AccountContainer;
