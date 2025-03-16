import React from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { useTranslation } from "react-i18next";
import { logout } from "~/features/authSlice";

interface UserProfileMobileMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const UserProfileMobileMenu: React.FC<UserProfileMobileMenuProps> = ({ isOpen, toggleMenu }) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);

    console.log("user:", user)

    const handleLogout = () => {
        dispatch(logout());
        toggleMenu(); // Close menu after logout
    };

    return (
        <>
            {/* User Info */}
            <div className="w-full">
                {user ? (

                    <div className="flex items-center gap-3">
                        <img
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="text-gray-900 font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left text-red-500 hover:text-red-700 py-2"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <Link
                            to="/login"
                            className="w-1/2 text-center bg-blue-600 text-white py-2 rounded-md"
                            onClick={toggleMenu}
                        >
                           {t("btn.login")}
                        </Link>
                        <Link
                            to="/register"
                            className="w-1/2 text-center bg-gray-200 text-gray-700 py-2 rounded-md"
                            onClick={toggleMenu}
                        >
                            {t("btn.sign_up")}
                        </Link>
                    </div>
                )}
            </div>


        </>
    );
};

export default UserProfileMobileMenu;
