import React from 'react';
import { useAppSelector } from '~/hooks';
import { calculateTotal, calculateTax, calculateFinalTotal } from '~/utils/calculate';

interface CartSummaryProps {
    taxRate: number;
    shippingFee: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ taxRate, shippingFee }) => {
    const cartItems = useAppSelector(state => state.cart.items); // Access cart items from Redux

    const subtotal = calculateTotal(cartItems);
    const tax = calculateTax(subtotal, taxRate);
    const total = calculateFinalTotal(cartItems, taxRate, shippingFee);

    return (
        <div className="cart-summary p-4 border rounded-md space-y-2">
            <p className="flex justify-between text-sm font-medium">
                <span>Subtotal:</span> ${subtotal.toFixed(2)}
            </p>
            <p className="flex justify-between text-sm font-medium">
                <span>Tax</span> ({taxRate}%): ${tax.toFixed(2)}
            </p>
            <p className="flex justify-between text-sm font-medium">
                <span>Shipping Fee:</span> ${shippingFee.toFixed(2)}
            </p>
            <h3 className="flex justify-between text-xl font-semibold">
                <span>Total:</span> ${total.toFixed(2)}
            </h3>
        </div>
    );
};

export default CartSummary;
