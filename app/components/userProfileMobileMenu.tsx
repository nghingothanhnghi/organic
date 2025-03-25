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
                            alt=""
                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="w-10 h-10 rounded-full ring-2 ring-white"
                        />
                        <div>
                            <p className="text-gray-900 font-medium">{user.firstName} {user.lastName}</p>
                            <div className="text-gray-600 text-sm truncate">{user.email}</div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left text-red-500 hover:text-red-700 py-2"
                            >
                                {t('btn.logout')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <Link
                            to="/login"
                            className="w-1/2 text-center bg-green-600 hover:bg-green-500 text-white py-2 rounded-md"
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
