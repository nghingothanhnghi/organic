// app/components/topNavBar.tsx
import React, { useState } from "react";
import { Link } from "react-router";
import Dropdown from "./dropdown";
import UserProfileDropdown from "./userProfileDropdown";
import { useAppSelector } from "~/hooks";
import { useTranslation } from "react-i18next";
import { safeSessionStorage } from "~/utils/storage";
const TopNavBar = () => {
    const { t, i18n } = useTranslation();

    // Assuming 'user' is stored in your global state or localStorage
    const user = useAppSelector(state => state.auth.user); // Replace with your actual state shape if needed


    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang); // Change language on selection
        safeSessionStorage.setItem("language", lang); // Use session storage safely
    };


    return (
        <div className="bg-orange-950 text-white py-2">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6">
                {/* Left Column - Check Order Link */}
                <div className="flex items-center space-x-3">
                    {/* Location Dropdown */}
                    <Dropdown
                        buttonLabel={t("location.label")}
                        dropdownClass="left-0 min-w-36"
                        showIcon={true}
                        customIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 me-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>

                        }
                    >
                        <li className="px-3 py-2 hover:bg-gray-100">
                            <a href="/language/en">{t("location.tphcm")}</a>
                        </li>
                        <li className="px-3 py-2 hover:bg-gray-100">
                            <a href="/language/vn">{t("location.hanoi")}</a>
                        </li>
                        {/* Add more language options here */}
                    </Dropdown>
                    {/* Language Dropdown */}
                    <Dropdown
                        buttonLabel={t("language.label")}
                        showIcon={true}
                        customIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 me-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>

                        }
                    >
                        <li className="px-3 py-2 hover:bg-gray-100">
                            <button onClick={() => handleLanguageChange('en')}>{t("language.english")}</button>
                        </li>
                        <li className="px-3 py-2 hover:bg-gray-100">
                            <button onClick={() => handleLanguageChange('vi')}>{t("language.vietnamese")}</button>
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
                        <a href="/contact" className="text-xs text-orange-300 hover:text-orange-400 flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </svg>

                            Hotline: +84 906 533 607
                        </a>
                        {/* Add more links as needed */}
                    </div>
                    <Link
                        to="/order-check"
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
