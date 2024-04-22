import { useState } from "react";
import TransactionForm from "./TransactionForm";

const TransactionCreate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        New Transaction
      </button>
      <TransactionForm isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default TransactionCreate;
