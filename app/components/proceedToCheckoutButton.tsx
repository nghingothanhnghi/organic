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
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
            Proceed to Checkout
        </button>
    );
};

export default ProceedToCheckoutButton;
