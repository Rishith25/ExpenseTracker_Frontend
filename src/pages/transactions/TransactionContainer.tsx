import { useEffect } from "react";
import { fetchTransactions } from "../../context/transactions/actions";
import { useTransactionsDispatch } from "../../context/transactions/context";

const TransactionContainer = () => {
  const dispatchTransactions = useTransactionsDispatch();
  useEffect(() => {
    fetchTransactions(dispatchTransactions);
  }, [dispatchTransactions]);
  return null; // Or any other JSX if needed
};

export default TransactionContainer;
