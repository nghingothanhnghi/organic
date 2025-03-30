import React from 'react';

interface NavButtonProps {
  direction: 'next' | 'prev';
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: () => void;
  disabled?: boolean; 
}

const NavSwiperButton: React.FC<NavButtonProps> = ({ direction, className, style, id, onClick, disabled }) => {
  const isNext = direction === 'next';
  return (
    <button
      id={id}
      onClick={onClick}
      aria-label={`${isNext ? 'Next' : 'Previous'} slide`}
      className={`rounded-full border border-lime-900 p-3 text-lime-900 transition 
        hover:bg-lime-900 hover:text-white ${className} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable styling
      style={style}
      disabled={disabled} // Apply the disabled prop
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`h-5 w-5 ${isNext ? '' : 'rotate-180'}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

export default NavSwiperButton;
