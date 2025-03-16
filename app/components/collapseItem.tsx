import React from 'react';
import useToggleClass from '~/hooks/useToggleClass';
import useResponsive from '~/hooks/useResponsive';

interface CollapseProps {
    title: string;
    targetClass: string;
    children: React.ReactNode;
    // Optionally, add other hook options if needed:
    initialState?: boolean;
    useLocalStorage?: boolean;
    storageKey?: string;
    closeOnClickOutside?: boolean;
}

const CollapseItem: React.FC<CollapseProps> = ({
    title,
    targetClass,
    children,
    initialState = false,
    useLocalStorage = false,
    storageKey = '',
    closeOnClickOutside = true,
}) => {
    const { isMobile } = useResponsive();
    // Using the useToggleClass hook with provided options
    const { isActive, toggleClass } = useToggleClass(
        initialState,
        targetClass,
        useLocalStorage,
        storageKey,
        closeOnClickOutside
    );
    // When not mobile, force the content to be visible.
    const currentIsActive = isMobile ? isActive : true;
    return (
        <div>
            <h4
                className="text-white font-semibold text-sm mb-3 cursor-pointer flex items-center justify-between"
                onClick={isMobile ? toggleClass : undefined}
            >

                {title}
                {isMobile && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transition-transform duration-300 ${currentIsActive ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </h4>
            {/* Conditionally render the children based on the isActive state */}
            <div className={`overflow-hidden transform origin-top transition-transform duration-300 ${currentIsActive ? 'scale-y-100' : 'scale-y-0'}`}
            >
                {children}
            </div>
        </div>
    );
};

export default CollapseItem;
