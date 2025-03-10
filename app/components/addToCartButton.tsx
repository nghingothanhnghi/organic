// app/components/addToCartButton.tsx
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { addToCart } from '~/features/cartSlice';
import type { Product } from '~/types/product';
import { useTranslation } from 'react-i18next';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number; // Accept an optional quantity prop
  className?: string; // Optional className prop
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, quantity = 1, className }) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);
  // const [quantity, setQuantity] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(0);

  useEffect(() => {
    // Update the quantity from the cart state
    const cartItem = cartItems.find((item) => item.id === product.id);
    setCurrentQuantity(cartItem?.quantity || 0);
  }, [cartItems, product.id]);

  const handleAddToCart = async () => {
    setLoading(true); // Start loading spinner
    try {
      // Simulate async operation, such as an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // (A more elegant solution would be to update your action and reducer to accept a quantity.)
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full text-sm bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-700 hover:shadow-lg'
        } transition duration-300 ${className || ''}`}
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
          {t("btn.adding")}
        </div>
      ) : currentQuantity > 0 ? (
        `(${currentQuantity}) ${t("btn.added_to_cart")}`
      ) : (
        (t("btn.add_to_cart"))
      )}
    </button>
  );
};

export default AddToCartButton;





