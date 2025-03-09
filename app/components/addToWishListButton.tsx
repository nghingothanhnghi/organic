// components/addToWishListButton.tsx
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '~/hooks';
import { addToWishlist } from '~/features/wishlistSlice';
import type { Product } from '~/types/product';

interface addToWishListButtonProps {
    product: Product;
} 

const AddToWishListButton: React.FC<addToWishListButtonProps> = ({ product }) => {
    const dispatch = useAppDispatch();
  
    const handleAddToWishlist = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault(); // Prevents navigation since we're using an <a> tag
      dispatch(addToWishlist(product));
    };
  
    return (
      <a
        href="#"
        onClick={handleAddToWishlist}
        title="Add to favorites"
        className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        role="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
      </a>
    );
  };
  
  export default AddToWishListButton;