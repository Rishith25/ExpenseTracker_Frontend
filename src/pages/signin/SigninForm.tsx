/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/images/signin.png";
import { API_ENDPOINT } from "../../config/constants";

const SigninForm: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(`${API_ENDPOINT}/signin/`, {
        email: userEmail,
        password: userPassword,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="max-w-screen-lg w-full flex bg-white rounded-lg shadow-md overflow-hidden">
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
            Sign In
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
                className="w-full hover:bg-green-700 bg-green-400 text-white hover:text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-green  transition duration-300 ease-in-out"
              >
                Sign-In
              </button>
            </div>
          </form>
          <div className="mt-4 text-center text-gray-700">
            Don't have an account?
            <div>
              <Link
                to="/signup"
                className="text-green-400 hover:text-green-600"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
