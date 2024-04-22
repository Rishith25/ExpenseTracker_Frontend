import React from "react";
import TransactionDetails from "./TransactionDetails";
import TransactionCreate from "./TransactionCreate";

const Transaction: React.FC = () => {
  return (
    <>
      <TransactionCreate />
      <TransactionDetails />
    </>
  );
};
export default Transaction;
