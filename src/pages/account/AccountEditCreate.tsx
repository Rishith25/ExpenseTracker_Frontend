/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { API_ENDPOINT } from "../../config/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAccounts } from "../../context/accounts/actions";
import { useAccountsDispatch } from "../../context/accounts/context";

type Inputs = {
  account_no: string;
  balance: number;
  bank_name: string;
  is_default: boolean;
};

interface AccountFormProps {
  account: Inputs;
}

const AccountEditForm: React.FC<AccountFormProps> = ({ account }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error] = useState(null);
  const { t } = useTranslation();

  const accountsDispatch = useAccountsDispatch();

  // useEffect(() => {
  //   fetchAccounts(accountsDispatch);
  // }, [accountsDispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      account_no: account.account_no,
      balance: account.balance,
      bank_name: account.bank_name,
      is_default: account.is_default,
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const authToken = localStorage.getItem("authToken");

    const response = await axios.post(
      `${API_ENDPOINT}/account/${account.account_no}/`,
      data,
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );

    if (response) {
      setIsOpen(false);
      console.log("Account updated successfully");
      fetchAccounts(accountsDispatch);
      toast.success("Account updated successfully", {
        autoClose: 3000,
      });
    } else {
      // Or I'll set the error.
      toast.error("Account with this account no already exists.");
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {t("Create New Account")}
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {error && <span>{error}</span>}

                      <input
                        id="Account"
                        type="number"
                        placeholder={t("Enter Account no...")}
                        {...register("account_no", { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.account_no ? "border-red-500" : ""
                        }`}
                      />

                      {errors.account_no && (
                        <span>{t("This field is required")}</span>
                      )}

                      <input
                        id="Bank"
                        type="text"
                        placeholder={t("Enter Bank name...")}
                        {...register("bank_name", { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.bank_name ? "border-red-500" : ""
                        }`}
                      />

                      {errors.bank_name && (
                        <span>{t("This field is required")}</span>
                      )}

                      <input
                        id="Balance"
                        type="number"
                        placeholder={t("Enter balance...")}
                        {...register("balance", { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.balance ? "border-red-500" : ""
                        }`}
                      />

                      {errors.balance && (
                        <span>{t("This field is required")}</span>
                      )}

                      <div className="flex items-center my-4">
                        <input
                          id="isDefault"
                          type="checkbox"
                          {...register("is_default")}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <label htmlFor="isDefault" className="ml-2">
                          {t("Default")}
                        </label>

                        {errors.is_default && (
                          <span>{t("This field is required")}</span>
                        )}
                      </div>

                      <button
                        id="submitNewProjectBtn"
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {t("Submit")}
                      </button>

                      <button
                        id="CancelBtn"
                        type="button"
                        onClick={closeModal}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {t("Cancel")}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AccountEditForm;
