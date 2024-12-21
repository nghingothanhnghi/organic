// app/components/topNavBar.tsx
import React, { useState } from "react";
import { Link } from "react-router";
import Dropdown from "./dropdown";
import UserProfileDropdown from "./userProfileDropdown";
import { useAppSelector } from "~/hooks";
import { useTranslation } from "react-i18next";
const TopNavBar = () => {
    const { t, i18n } = useTranslation();

    // Assuming 'user' is stored in your global state or localStorage
    const user = useAppSelector(state => state.auth.user); // Replace with your actual state shape if needed


    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang); // Change language on selection
    };


    return (
        <div className="bg-orange-950 text-white py-2">
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Left Column - Check Order Link */}
                <div className="flex items-center space-x-3">
                    {/* Location Dropdown */}
                    <Dropdown
                        buttonLabel="Location"
                        dropdownClass="left-0 min-w-36"
                        showIcon={true}
                        customIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 me-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>

                        }
                    >
                        <li className="px-3 py-2 hover:bg-gray-100">
                            <a href="/language/en">English</a>
                        </li>
                        <li className="px-3 py-2 hover:bg-gray-100">
                            <a href="/language/vn">Vietnamese</a>
                        </li>
                        {/* Add more language options here */}
                    </Dropdown>
                    {/* Language Dropdown */}
                    <Dropdown buttonLabel="Language">
                        <li className="px-3 py-2 hover:bg-gray-100">
                            <button onClick={() => handleLanguageChange('en')}>English</button>
                        </li>
                        <li className="px-3 py-2 hover:bg-gray-100">
                            <button onClick={() => handleLanguageChange('vi')}>Vietnamese</button>
                        </li>
                        {/* Add more language options here */}
                    </Dropdown>
                </div>

                {/* Center Column - Logo or Centered Content */}
                {/* <div className="text-center flex-grow">
          <a href="/" className="text-lg font-semibold hover:text-gray-400">
            My Website
          </a>
        </div> */}

                {/* Right Column - Language Dropdown and Navigation Links */}
                <div className="flex items-center space-x-3">
                    {/* Navigation Links */}
                    <div className="flex items-center space-x-3">
                        <a href="/about" className="text-xs hover:text-gray-400 ">
                            About
                        </a>
                        <a href="/contact" className="text-xs hover:text-gray-400">
                            Contact
                        </a>
                        {/* Add more links as needed */}
                    </div>
                    <Link
                        to="/register"
                        className="px-2 py-1 flex items-center justify-center p-0.5 me-2 text-xs text-white rounded bg-orange-900 hover:bg-orange-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 me-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>

                        {t("btn.check_order")}

                    </Link>
                    {/* Conditionally render User Profile or Login Button */}
                    {user ? (
                        // If user is logged in, show the profile dropdown
                        <UserProfileDropdown />
                    ) : (
                        // If user is not logged in, show the login button
                        <Link
                            to="/login"
                            className="px-2 py-1 flex items-center justify-center p-0.5 me-2 text-xs text-white rounded bg-green-600 hover:bg-green-500"
                        >
                            {t("btn.login")}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopNavBar;
