/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchAccounts } from "../../context/accounts/actions";
import {
  useAccountsState,
  useAccountsDispatch,
} from "../../context/accounts/context";
import {
  addTransactions,
  fetchTransactions,
} from "../../context/transactions/actions";
import { useTransactionsDispatch } from "../../context/transactions/context";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

type TransactionInputs = {
  account_no: number;
  category: string;
  amount: number;
  timestamp: string;
  transaction_type: string;
  mode_of_payment: string;
  description: string;
  attachment: string;
};

enum transaction_type {
  expense = "expense",
  income = "income",
}

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [error, setError] = useState(null);
  const accountsState: any = useAccountsState();
  const accountsDispatch = useAccountsDispatch();

  const { accounts } = accountsState || {};

  const transactionsDispatch = useTransactionsDispatch();

  const [transactionType, setTransactionType] = useState<transaction_type>(
    transaction_type.expense
  );

  useEffect(() => {
    fetchAccounts(accountsDispatch);
    fetchTransactions(transactionsDispatch);
  }, [accountsDispatch, transactionsDispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionInputs>();

  const onSubmit: SubmitHandler<TransactionInputs> = async (data) => {
    try {
      await addTransactions(transactionsDispatch, {
        ...data,
        transaction_type: transactionType,
      });
      fetchTransactions(transactionsDispatch);
      reset();
      toast.success("Transaction Created successfully");
      onClose(); // Close the form
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.success("Transaction Created Failed");
    }
  };

  const closeModal = () => {
    setError(null); // Clear any previous errors when closing the dialog
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center"
        onClose={closeModal}
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        {/* Dialog content */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative bg-white rounded-xl sm:p-6 w-full max-w-sm">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 text-center py-2"
            >
              Create New Transaction
            </Dialog.Title>
            <div className="flex justify-between mb-2 sm:mb-4">
              <button
                className={`px-3 py-1 text-sm font-semibold rounded-full focus:outline-none ${
                  transactionType === "expense"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setTransactionType(transaction_type.expense)}
              >
                Expense
              </button>
              <button
                className={`px-3 py-1 text-sm font-semibold rounded-full focus:outline-none ${
                  transactionType === "income"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setTransactionType(transaction_type.income)}
              >
                Income
              </button>
            </div>
            <div className="mt-2 sm:mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                {error && <span>{error}</span>}

                <select
                  id="account"
                  {...register("account_no", { required: true })}
                  className={`w-full border rounded-md py-1 px-2 sm:py-2 sm:px-3 my-1 sm:my-2 text-sm sm:text-base text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                    errors.account_no ? "border-red-500" : ""
                  }`}
                >
                  <option value="" className="text-gray-700">
                    Select an account
                  </option>
                  {accounts &&
                    accounts.map((account: any) => (
                      <option
                        key={account.account_no}
                        value={account.account_no}
                        className={`w-full border rounded-md py-1 px-2 sm:py-2 sm:px-3 my-1 sm:my-2 text-sm sm:text-base text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.account_no ? "border-red-500" : ""
                        }`}
                      >
                        {account.account_no}
                      </option>
                    ))}
                </select>
                {errors.account_no && (
                  <span className="text-red-500">This field is required</span>
                )}
                <input
                  type="text"
                  placeholder="Category"
                  {...register("category", { required: true })}
                  className={`w-full border rounded-md py-1 px-2 sm:py-2 sm:px-3 my-1 sm:my-2 text-sm sm:text-base text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                    errors.category ? "border-red-500" : ""
                  }`}
                />
                {errors.category && <span>This field is required</span>}
                <input
                  type="text"
                  placeholder="Description"
                  {...register("description", { required: true })}
                  className={`w-full border rounded-md py-1 px-2 sm:py-2 sm:px-3 my-1 sm:my-2 text-sm sm:text-base text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && <span>This field is required</span>}

                {/* Add other input fields for transaction details */}
                {/* Input field for transaction type */}
                <input
                  type="hidden"
                  value={transactionType}
                  {...register("transaction_type")}
                />
                {/* Input field for timestamp */}
                <input
                  type="datetime-local"
                  {...register("timestamp", { required: true })}
                  className={`w-full border rounded-md py-1 px-2 sm:py-2 sm:px-3 my-1 sm:my-2 text-sm sm:text-base text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                    errors.timestamp ? "border-red-500" : ""
                  }`}
                />
                {errors.timestamp && <span>This field is required</span>}
                <input
                  type="number"
                  placeholder="Amount"
                  {...register("amount", { required: true })}
                  className={`w-full border rounded-md py-1 px-2 sm:py-2 sm:px-3 my-1 sm:my-2 text-sm sm:text-base text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                    errors.amount ? "border-red-500" : ""
                  }`}
                />
                {errors.amount && <span>This field is required</span>}
                <input
                  type="text"
                  placeholder="Mode of Payment"
                  {...register("mode_of_payment", { required: true })}
                  className={`w-full border rounded-md py-1 px-2 sm:py-2 sm:px-3 my-1 sm:my-2 text-sm sm:text-base text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                    errors.mode_of_payment ? "border-red-500" : ""
                  }`}
                />
                {errors.mode_of_payment && <span>This field is required</span>}
                <input
                  type="url"
                  placeholder="Attach File Url (Optional)"
                  {...register("attachment")}
                  className={`w-full border rounded-md py-1 px-2 sm:py-2 sm:px-3 my-1 sm:my-2 text-sm sm:text-base text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                    errors.attachment ? "border-red-500" : ""
                  }`}
                />
                {errors.attachment && <span>This field is required</span>}

                {/* Add input fields for other attributes */}
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default TransactionForm;
