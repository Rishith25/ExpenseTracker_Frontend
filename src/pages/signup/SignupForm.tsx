// src/pages/signup/SignupForm.tsx
import axios from "axios";
import React, { useState } from "react";
// import { API_ENDPOINT } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/signup.png";
import { API_ENDPOINT } from "../../config/constants";

const SignupForm: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`${API_ENDPOINT}/signup/`, {
        email: userEmail,
        password: userPassword,
        first_name: userFirstName,
        last_name: userLastName,
        phone_number: userPhone,
      })
      .then(async (response) => {
        console.log(response.data);
        // After successful signin, first we will save the token in localStorage
        localStorage.setItem("authToken", response.data.auth_token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        return navigate("/home/dashboard");
      })
      .catch((error) => {
        console.error(error.response.data.error);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-300">
      <div className="max-w-screen-lg w-full flex bg-white rounded-xl shadow-md overflow-hidden">
        {/* Left Side (Empty) */}
        <div className="w-2/3 bg-gray-200 relative">
          <img
            className="w-full h-full object-cover"
            src={Logo}
            alt="Sign In Logo"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/3 p-8">
          <div className="text-center"></div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border rounded-md py-2 px-3 bg-gray-200 focus:outline-none focus:shadow-outline-gray"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="userFirstName"
                className="block text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="userFirstName"
                name="userFirstName"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
                placeholder="Firstname"
                className="w-full border rounded-md py-2 px-3 bg-gray-200 focus:outline-none focus:shadow-outline-gray"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="userLastName"
                className="block text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="userLastName"
                name="userLastName"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                placeholder="Lastname"
                className="w-full border rounded-md py-2 px-3 bg-gray-200 focus:outline-none focus:shadow-outline-gray"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="userPhone" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="userPhone"
                name="userPhone"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full border rounded-md py-2 px-3 bg-gray-200 focus:outline-none focus:shadow-outline-gray"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border rounded-md py-2 px-3 bg-gray-200 focus:outline-none focus:shadow-outline-gray"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition duration-300 ease-in-out"
              >
                Sign-Up
              </button>
            </div>
          </form>
          <div className="mt-4 text-center text-gray-700">
            Don't have an account?
            <div>
              <Link to="/signin" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
