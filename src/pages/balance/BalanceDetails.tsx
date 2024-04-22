/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {} from "../../index.css";
import accountbalance from "../../assets/dashboard/wallet.png";
import axios from "axios";
import { useTranslation } from "react-i18next";

const BalanceDetails = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setisAnimating] = useState(false);
  const { t } = useTranslation();

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setisAnimating(true);
    }
  };

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Token ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8000/api/account/",
          config
        );
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }
    fetchAccounts();
  }, []);

  function calculateTotalBalance(accounts: any) {
    let totalBalance = 0;
    for (let account of accounts) {
      totalBalance += parseFloat(account.balance);
    }
    return totalBalance.toFixed(2); // Ensure total balance is rounded to 2 decimal places
  }

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  // console.log(user);

  return (
    <>
      <div
        className="flip-card w-[280px] h-[140px] rounded-lg"
        onClick={handleFlip}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%] bg-blue-600 rounded-lg"
          style={{ borderRadius: "25px" }}
          initial={false}
          animate={{ rotateX: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
          onAnimationComplete={() => setisAnimating(false)}
        >
          <div
            className="flip-card-front w-full h-full  text-black rounded-lg p-4 flex flex-col justify-between"
            style={{ borderRadius: "25px" }}
          >
            <div className="flex items-center">
              <div>
                <div className="flex items-center">
                  <img
                    src={accountbalance}
                    alt="balance"
                    className="w-8 mr-4"
                  />
                  <div className="font-bold text-xl text-white whitespace-nowrap">
                    {t("Account Balance")}
                  </div>
                </div>
                {/* <p className="text-xs text-gray-500 flex items-center">
                  Higher than last month
                </p> */}
              </div>
            </div>

            <hr className="my-4 border-t border-gray-300" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                className="text-white text-base font-semibold"
                style={{
                  fontFamily: "Gabrilo, sans-serif",
                  fontSize: "24px",
                  marginBottom: "0.5rem",
                  marginRight: "0.5rem", // Adjust as needed for spacing between text and icon
                  whiteSpace: "nowrap", // Prevent text from wrapping onto a new line
                  overflow: "hidden", // Hide overflow text
                  textOverflow: "ellipsis", // Show ellipsis (...) for overflow text
                }}
              >
                ₹{" "}
                {Number(calculateTotalBalance(accounts)).toLocaleString(
                  "en-IN"
                )}
              </p>
              <a href="/home/account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36px"
                  height="36px"
                  viewBox="0 0 260 250"
                >
                  <path
                    fill="currentColor"
                    d="M198.71 57.29A100 100 0 1 0 57.29 198.71A100 100 0 1 0 198.71 57.29m-5.66 135.76A92 92 0 1 1 220 128a91.37 91.37 0 0 1-26.95 65.05m-70.22-67.88a4 4 0 0 1 0 5.66l-32 32a4 4 0 0 1-5.66-5.66L114.34 128L85.17 98.83a4 4 0 0 1 5.66-5.66Zm56 0a4 4 0 0 1 0 5.66l-32 32a4 4 0 0 1-5.66-5.66L170.34 128l-29.17-29.17a4 4 0 0 1 5.66-5.66Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div
            className="flip-card-back w-full h-full  text-black rounded-lg p-4 flex flex-col justify-between"
            style={{ borderRadius: "25px" }}
          >
            <div className="font-bold text-lg text-white whitespace-nowrap">
              {t("Account Info")}
            </div>
            <p className="text-md text-white whitespace-nowrap">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-md text-white whitespace-nowrap">
              <strong>{t("Full Name")}:</strong> {user.first_name}{" "}
              {user.last_name}
            </p>
            <p className="text-md text-white whitespace-nowrap">
              <strong>{t("Phone Number")}:</strong> {user.phone_number}
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BalanceDetails;
