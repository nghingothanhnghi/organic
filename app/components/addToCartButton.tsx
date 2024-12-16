// app/components/addToCartButton.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '~/hooks';
import { addToCart } from '~/features/cartSlice';
import type { Product } from '~/types/product';

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true); // Start loading spinner
    try {
      // Simulate async operation, such as an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dispatch addToCart with quantity
      dispatch(addToCart(product));
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-700 hover:shadow-lg'
        } transition duration-300`}
      disabled={loading} // Disable button while loading
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          Adding...
        </div>
      ) : (
        'Add to Cart'
      )}
    </button>
  );
};

export default AddToCartButton;
