// app/components/topNavBar.tsx
import React, { useState } from "react";
import { Link } from "react-router";
import Dropdown from "./dropdown";
import { useTranslation } from "react-i18next";
const TopNavBar = () => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang); // Change language on selection
    };


    return (
        <div className="bg-orange-950 text-white py-2">
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Left Column - Check Order Link */}
                <div className="flex items-center space-x-3">
                    {/* Location Dropdown */}
                    <Dropdown buttonLabel="Location" dropdownClass="left-0 min-w-36">
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
                        className="relative px-5 py-1 inline-flex items-center justify-center p-0.5 me-2 text-xs font-medium text-white rounded bg-orange-900 hover:bg-orange-800"
                    >

                        {t("btn.check_order")}

                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopNavBar;
