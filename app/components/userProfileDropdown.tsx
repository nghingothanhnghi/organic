import React from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { useTranslation } from 'react-i18next';
import { logout } from '~/features/authSlice';  // Adjust the path accordingly
import useToggleClass from '~/hooks/useToggleClass';  // Adjust the path accordingly

const UserProfileDropdown: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user); // Adjust according to your state shape

    // Using the custom hook to manage dropdown state
    const { isActive, toggleClass, close } = useToggleClass(
        false,
        'dropdown',
        true,
        'dropdownState',
        true
    );

    const handleLogout = () => {
        dispatch(logout());
        close(); // Close the dropdown after logout
    };

    return (
        <div className="relative">
            <div
                className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded hover:bg-orange-800"
                onClick={toggleClass}
            >
                <span className="font-semibold text-xs">{user?.firstName}</span>
                <span className={`dropdown-icon text-gray-200 text-xs transition-transform transform ${isActive ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={8} height={8} viewBox="0 0 24 24" fill="currentColor" 
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20.118 3h-16.225a2.914 2.914 0 0 0 -2.503 4.371l8.116 13.549a2.917 2.917 0 0 0 4.987 .005l8.11 -13.539a2.914 2.914 0 0 0 -2.486 -4.386z" />
                    </svg>
                </span>
            </div>

            {isActive && (
                <div className="dropdown pb-2 absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                    <div className="px-4 py-5 text-sm text-gray-700 flex items-center gap-2">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="inline-block size-6 rounded-full ring-2 ring-white"
                        />
                        <span>{user?.email}</span>
                    </div>
                    <a
                        className="px-4 py-2 text-sm text-gray-700 block hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                    >
                        {t('btn.logout')}
                    </a>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;
