// components/ProceedToCheckoutButton.tsx
import React from 'react';
import { useAppSelector } from '~/hooks';  // Assuming you use Redux for cart state
import { useNavigate } from 'react-router';

interface ProceedToCheckoutButtonProps {
    closeCart: () => void; // Function to close the cart sidebar
}

const ProceedToCheckoutButton: React.FC<ProceedToCheckoutButtonProps> = ({ closeCart }) => {
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
            className="w-full px-4 py-2 text-white rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:from-pink-500 hover:to-orange-500"
        >
            Proceed to Checkout
        </button>
    );
};

export default ProceedToCheckoutButton;
