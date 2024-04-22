/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/theme";
import { Link } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { useTranslation } from "react-i18next";

const BarChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
};

// const DollarSignIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...props}
//     >
//       <line x1="12" x2="12" y1="2" y2="22" />
//       <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//     </svg>
//   );
// };

// const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...props}
//     >
//       <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//       <polyline points="9 22 9 12 15 12 15 22" />
//     </svg>
//   );
// };

// const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...props}
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// };

const WalletIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

const useroptions: any[] = [
  { name: "Your Profile", href: "/profile", current: false },
  { name: "Settings", href: "/settings", current: false },
  { name: "Sign Out", href: "/logout", current: false },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

export default function Appbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === "dark");

  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "/home/dashboard", current: false },
    { name: "Accounts", href: "/home/account", current: false },
    { name: "Transactions", href: "/home/transaction", current: false },
    { name: "Analytics", href: "/home/analytics", current: false },
  ]);

  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);

    // throw new Error("An error occurred while changing the language");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setEnabled(!enabled);
    setTheme(newTheme);
  };

  const handleItemClick = (clickedItem: {
    name: any;
    href?: string;
    current?: boolean;
  }) => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.name === clickedItem.name,
    }));
    setNavigation(updatedNavigation);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === pathname,
    }));
    setNavigation(updatedNavigation);
  }, [pathname]);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            <div
              className={`lg:hidden ${
                open ? "hidden" : "block"
              }"absolute inset-y-0 left-0 flex items-center sm:hidden"`}
            >
              {/* Mobile menu button */}
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className={`lg:flex ${open ? "hidden" : "block"}`}>
              <div className="w-full lg:w-56 border-r bg-gray-100 dark:bg-gray-100">
                <div className="flex h-[60px] items-center border-b px-6">
                  <Link
                    className="flex items-center gap-2 font-semibold text-gray-700"
                    to={""}
                  >
                    <WalletIcon className="h-6 w-6 text-black" />
                    <span className="text-black">Expense Tracker</span>
                  </Link>
                </div>
                <div className="sm:items-stretch sm:justify-start">
                  {/* <div className="py-1"></div> */}
                  <div className="p-2">
                    <h5
                      className="font-semibold text-gray-600 px-4"
                      style={{
                        fontFamily: "Gabrilo, sans-serif",
                        fontSize: "13px",
                        letterSpacing: "0.2em",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t("NAVIGATION")}
                    </h5>
                    {/* Navigation */}
                    <nav className="grid  text-sm font-medium py-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "flex items-center gap-3 rounded-lg fill-white px-3 py-3 bg-blue-600 transition-all hover:text-gray-900 dark:text-white dark:hover:text-gray-50"
                              : "text-black hover:bg-gray-700 fill-black hover:text-white hover:fill-white flex items-center gap-3 rounded-lg px-3 py-3 transition-all my-1",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => handleItemClick(item)}
                        >
                          {/* Render icon based on item name */}
                          {item.name === "Dashboard" && (
                            <svg
                              className=""
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 6L14 6"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 10H18"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 14L18 14"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 18L18 18"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2 21.4V2.6C2 2.26863 2.26863 2 2.6 2H18.2515C18.4106 2 18.5632 2.06321 18.6757 2.17574L21.8243 5.32426C21.9368 5.43679 22 5.5894 22 5.74853V21.4C22 21.7314 21.7314 22 21.4 22H2.6C2.26863 22 2 21.7314 2 21.4Z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 18V14H9V18H6Z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 2V5.4C18 5.73137 18.2686 6 18.6 6H22"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}

                          {item.name === "Accounts" && (
                            <svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m6.25 3h11.5c1.7330315 0 3.1492459 1.35645477 3.2448552 3.06557609l.0051448.18442391v11.5c0 1.7330315-1.3564548 3.1492459-3.0655761 3.2448552l-.1844239.0051448h-11.5c-1.73303146 0-3.14924593-1.3564548-3.24485521-3.0655761l-.00514479-.1844239v-11.5c0-1.73303146 1.35645477-3.14924593 3.06557609-3.24485521zm2.07501359 11.5h-3.82501359v3.25c0 .9181734.70711027 1.6711923 1.60647279 1.7441988l.14352721.0058012h11.5c.9181734 0 1.6711923-.7071103 1.7441988-1.6064728l.0058012-.1435272v-3.25h-3.8250136c-.3345841 1.6482847-1.7502698 2.9039882-3.4746888 2.9947422l-.2002976.0052578c-1.7470252 0-3.21502348-1.1946559-3.63162671-2.8115995zm9.42498641-10h-11.5c-.9181734 0-1.67119234.70711027-1.7441988 1.60647279l-.0058012.14352721v6.75h4.5c.37969577 0 .69349096.2821539.74315338.6482294l.00684662.1017706c0 1.2426407 1.0073593 2.25 2.25 2.25 1.190864 0 2.1656449-.9251616 2.2448092-2.0959512l.0051908-.1540488c0-.3796958.2821539-.693491.6482294-.7431534l.1017706-.0068466h4.5v-6.75c0-.9181734-.7071103-1.67119234-1.6064728-1.7441988zm-11 5h10.5c.4142136 0 .75.33578644.75.75 0 .3796958-.2821539.693491-.6482294.7431534l-.1017706.0068466h-10.5c-.41421356 0-.75-.3357864-.75-.75 0-.37969577.28215388-.69349096.64822944-.74315338l.10177056-.00684662h10.5zm0-3h10.5c.4142136 0 .75.33578644.75.75 0 .37969577-.2821539.69349096-.6482294.74315338l-.1017706.00684662h-10.5c-.41421356 0-.75-.33578644-.75-.75 0-.37969577.28215388-.69349096.64822944-.74315338l.10177056-.00684662h10.5z" />
                            </svg>
                          )}
                          {item.name === "Transactions" && (
                            <svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m17.0020048 13c.5522847 0 1 .4477153 1 1 0 .5128358-.3860402.9355072-.8833789.9932723l-.1166211.0067277h-11.58500005l3.29210679 3.2928932c.36048396.360484.38821349.927715.0831886 1.3200062l-.0831886.0942074c-.36048397.3604839-.92771502.3882135-1.32000623.0831886l-.09420734-.0831886-5-5c-.60257508-.6025751-.2205609-1.6142876.59347584-1.7011235l.11363094-.0059833zm-.3891054-8.79029539.0942074.08318861 5 5c.6025751.60257508.2205609 1.61428758-.5934759 1.70112348l-.1136309.0059833h-14c-.55228475 0-1-.4477153-1-1 0-.51283584.38604019-.93550716.88337887-.99327227l.11662113-.00672773h11.585l-3.2921068-3.29289322c-.3604839-.36048396-.3882135-.92771502-.0831886-1.32000622l.0831886-.09420734c.360484-.36048396.927715-.3882135 1.3200062-.08318861z" />
                            </svg>
                          )}

                          {item.name === "Analytics" && <BarChartIcon />}
                          {t(`${item.name}`)}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-4"></div>

                <div className="p-2">
                  <h5
                    className="font-semibold text-gray-600 px-4"
                    style={{
                      fontFamily: "Gabrilo, sans-serif",
                      fontSize: "13px",
                      letterSpacing: "0.2em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t("PREFERENCES")}
                  </h5>
                  <nav className="grid  text-sm font-medium">
                    <div className="px-3 py-2 flex items-center">
                      <>
                        {!enabled ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                            />
                          </svg>
                        )}
                      </>

                      <span className="ml-4 mr-10 text-gray-600">
                        {enabled ? `${t("Dark")}` : `${t("Light")}`}
                      </span>

                      <Switch
                        checked={enabled}
                        onChange={toggleTheme}
                        className={`${enabled ? "bg-slate-700" : "bg-blue-600"}
    relative inline-flex h-[30px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            enabled ? "translate-x-9" : "translate-x-0"
                          }
      pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>

                    {/* Profile dropdown */}
                    <nav className="grid  text-sm font-medium py-2">
                      {useroptions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "flex items-center gap-3 rounded-lg fill-white px-3 py-2 bg-blue-400 transition-all hover:text-gray-900 dark:text-white dark:hover:text-gray-50"
                              : "text-black hover:bg-gray-700 fill-black hover:text-white hover:fill-white flex items-center gap-3 rounded-lg px-3 py-2 transition-all ",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {/* Render icon based on item name */}

                          {item.name === "Your Profile" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          )}
                          {item.name === "Settings" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          )}

                          {item.name === "Sign Out" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                              />
                            </svg>
                          )}
                          {t(`${item.name}`)}
                        </a>
                      ))}
                    </nav>
                  </nav>
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      {currentLanguage === "en"
                        ? "English"
                        : currentLanguage === "es"
                        ? "Spanish"
                        : "German"}{" "}
                      {/* Add the third language label */}
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Menu.Button>

                    <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-gray-100" : ""
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
                            onClick={() => changeLanguage("en")}
                          >
                            English
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-gray-100" : ""
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
                            onClick={() => changeLanguage("es")}
                          >
                            Spanish
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-gray-100" : ""
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
                            onClick={() => changeLanguage("gr")}
                          >
                            German
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <h5
                className="font-semibold text-gray-600 px-4"
                style={{
                  fontFamily: "Gabrilo, sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  marginBottom: "0.5rem",
                }}
              >
                NAVIGATION
              </h5>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <h5
                className="font-semibold text-gray-600 px-4"
                style={{
                  fontFamily: "Gabrilo, sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  marginBottom: "0.5rem",
                }}
              >
                PREFERENCES
              </h5>
              {useroptions.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
