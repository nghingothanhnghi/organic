// components/ProceedToCheckoutButton.tsx
import React from 'react';
import { useAppSelector } from '~/hooks';  // Assuming you use Redux for cart state
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

interface ProceedToCheckoutButtonProps {
    closeCart: () => void; // Function to close the cart sidebar
    rounded?: boolean;
}

const ProceedToCheckoutButton: React.FC<ProceedToCheckoutButtonProps> = ({ closeCart, rounded = true }) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const cartItems = useAppSelector(state => state.cart.items);

    const handleProceedToCheckout = () => {
        if (cartItems.length > 0) {
            // Close the cart sidebar before navigating
            closeCart();
            // Navigate to the checkout page, passing cartItems in the state
            navigate('/checkout', { state: { cartItems } });
        } else {
            alert("Your cart is empty.");
        }
    };

    return (
        <button
            onClick={handleProceedToCheckout}
            className={`w-full px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg 
                bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% 
                hover:from-pink-500 hover:to-orange-500 
                ${rounded ? "rounded-lg" : "rounded-none"}`} // Dynamically apply rounded styles
        >
            {t("btn.proceed_to_checkout")}
        </button>
    );
};

export default ProceedToCheckoutButton;
