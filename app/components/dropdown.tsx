// components/Dropdown.tsx
import React from "react";
import useToggleClass from '~/hooks/useToggleClass'

interface DropdownProps {
    buttonLabel: string; // Label of the button that toggles the dropdown
    children: React.ReactNode; // Content of the dropdown (e.g., list of links)
    dropdownClass?: string; // Custom class for the dropdown container
    buttonClass?: string; // Custom class for the button
    buttonStyle?: React.CSSProperties; // Inline styles for the button
    closeOnClickOutside?: boolean; // Optional, to close dropdown when clicking outside
    showIcon?: boolean;
    customIcon?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
    buttonLabel,
    children,
    dropdownClass = "w-32",
    buttonClass = "hover:bg-orange-900 text-xs py-1 px-2 rounded flex items-center",
    buttonStyle = {},
    closeOnClickOutside = true,
    showIcon = false,
    customIcon
}) => {
    const { isActive, toggleClass } = useToggleClass(false, "dropdown", true, "", closeOnClickOutside);

    return (
        <div className="relative">
            <button
                onClick={toggleClass} // Toggle the dropdown
                className={buttonClass}
                style={buttonStyle}
            >
               {showIcon && (customIcon || (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-3 me-2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                ))}
                {buttonLabel}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 ms-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            {isActive && (
                <div className={`${dropdownClass} dropdown absolute right-0 bg-white text-black rounded-md shadow-lg z-10`}>
                    <ul className="py-1">{children}</ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
