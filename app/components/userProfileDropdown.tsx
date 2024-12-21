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
        'dropdown-menu',
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
                <span className={`dropdown-icon text-gray-200 text-xs transition-transform transform ${isActive ? 'rotate-180' : ''}`}>▼</span>
            </div>

            {isActive && (
                <div className="dropdown absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                    <div className="px-4 py-2 text-sm text-gray-700">
                        <span>{user?.email}</span>
                    </div>
                    <div
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                    >
                        {t('logout')}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;
