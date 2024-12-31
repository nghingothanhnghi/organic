import React from 'react';

interface NavButtonProps {
  direction: 'next' | 'prev';
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: () => void;
}

const NavSwiperButton: React.FC<NavButtonProps> = ({ direction, className, style, id, onClick }) => {
  const isNext = direction === 'next';
  return (
    <button
      id={id}
      onClick={onClick}
      aria-label={`${isNext ? 'Next' : 'Previous'} slide`}
      className={`rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white ${className}`}
      style={style}
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
