/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchAccounts } from "../../context/accounts/actions";
import {
  useAccountsState,
  useAccountsDispatch,
} from "../../context/accounts/context";
import { fetchTransactions } from "../../context/transactions/actions";
import { useTransactionsDispatch } from "../../context/transactions/context";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";
import { API_ENDPOINT } from "../../config/constants";

type TransactionInputs = {
  id: string;
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
  transaction: TransactionInputs;
}

const TransactionEditForm: React.FC<TransactionFormProps> = ({
  transaction,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setError(null); // Clear any previous errors when closing the dialog
    setIsOpen(false);
  };
  const [error, setError] = useState(null);
  const accountsState: any = useAccountsState();
  const accountsDispatch = useAccountsDispatch();

  const { accounts } = accountsState || {};

  const transactionsDispatch = useTransactionsDispatch();

  const [transactionType, setTransactionType] = useState<transaction_type>(
    transaction_type.expense
  );

  const transactionTimestamp = transaction.timestamp;

  // Convert Unix timestamp to a Date object
  const date = new Date(transactionTimestamp);

  // Format the date for input value (yyyy-MM-DDTHH:mm)
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  useEffect(() => {
    fetchAccounts(accountsDispatch);
    fetchTransactions(transactionsDispatch);
  }, [accountsDispatch, transactionsDispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionInputs>({
    defaultValues: {
      account_no: transaction.account_no,
      category: transaction.category,
      amount: transaction.amount,
      timestamp: formattedDate,
      transaction_type: transaction.transaction_type,
      mode_of_payment: transaction.mode_of_payment,
      description: transaction.description,
      attachment: transaction.attachment,
    },
  });

  const onSubmit: SubmitHandler<TransactionInputs> = async (data) => {
    try {
      const token = localStorage.getItem("authToken") ?? "";
      await axios.put(
        `${API_ENDPOINT}/account/transaction/${transaction.id}`,
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      fetchTransactions(transactionsDispatch);
      reset();
      toast.success("Transaction Updated successfully");
      // onClose(); // Close the form
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.success("Transaction Updation Failed");
    }
  };

  return (
    <div>
      <button id="editButton" onClick={openModal} className="mx-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
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
                  {errors.mode_of_payment && (
                    <span>This field is required</span>
                  )}
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
    </div>
  );
};

export default TransactionEditForm;
