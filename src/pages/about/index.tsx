import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <section className="p-7 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-xl max-w-3xl mx-auto relative overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>

      {/* About Title and Description */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
          About Expense Tracker
        </h1>
        <p className="text-gray-700 text-lg">
          Track, manage, and understand your finances with ease. Our Expense
          Tracker helps you organize expenses, set budgets, and gain insights to
          make smart financial decisions.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-6"></div>

      {/* Key Features */}
      <div className="text-center mb-4 relative z-10">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Key Features
        </h2>
      </div>

      <ul className="space-y-4 text-gray-700 relative z-10">
        {[
          {
            text: "Track daily expenses and categorize them",
            iconPath: "M5 13l4 4L19 7",
          },
          {
            text: "Set and monitor monthly or weekly budgets",
            iconPath: "M12 8v8m-4-4h8",
          },
          {
            text: "Generate detailed reports for financial insights",
            iconPath: "M8 17l4 4 4-4M8 7l4-4 4 4",
          },
          {
            text: "Visualize spending trends with interactive charts",
            iconPath: "M3 3v18h18",
          },
          {
            text: "User-friendly interface for seamless tracking",
            iconPath: "M12 4.5v15M4.5 12h15",
          },
        ].map((feature, index) => (
          <li
            key={index}
            className="flex items-center space-x-3 hover:bg-indigo-50 p-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={feature.iconPath} />
            </svg>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* Testimonial Section */}
      <div className="mt-8 text-center relative z-10">
        <p className="text-gray-500 text-sm italic">
          “Take control of your finances and watch your savings grow.”
        </p>
        <p className="text-gray-500 text-sm">
          - Trusted by thousands of users worldwide
        </p>
      </div>

      {/* Call to Action Button */}
      <div className="mt-8 text-center relative z-10">
        <Link
          to="/home/dashboard"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition duration-300 inline-block text-center"
        >
          Start Tracking Your Expenses
        </Link>
      </div>
    </section>
  );
};

export default About;
