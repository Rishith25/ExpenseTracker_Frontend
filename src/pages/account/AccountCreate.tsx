/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  account_no: number;
  balance: number;
  bank_name: string;
  is_default: boolean;
};

const AccountCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    async function fetchAccounts() {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Token ${token}`,
          },
        };
        await axios.get(`${API_ENDPOINT}/account`, config);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }

    const authToken = localStorage.getItem("authToken");

    const response = await axios.post(`${API_ENDPOINT}/account/create`, data, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    // Then depending on response, I'll either close the modal...
    if (response) {
      setIsOpen(false);
      console.log("Account created successfully");
      fetchAccounts();
    } else {
      // Or I'll set the error.
      setError(response as React.SetStateAction<null>);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 font-bold"
          onClick={openModal}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <button
          id="newProjectBtn"
          type="button"
          onClick={openModal}
          className="ml-2 font-bold"
        >
          {t("Open an account")}
        </button>
      </div>

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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                      {/* I'll show the error, if it exists.*/}
                      {error && <span>{error}</span>}
                      <input
                        data-testid="account-no-input"
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
                        data-testid="bank-name-input"
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
                        data-testid="balance-input"
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

export default AccountCreate;
