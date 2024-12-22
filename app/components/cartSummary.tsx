// app/components/cartSummary.tsx
import React from 'react';
import { useAppSelector } from '~/hooks';
import { formatPrice } from '~/utils/formatPrice';
import { calculateTotal, calculateTax, calculateFinalTotal } from '~/utils/calculate';

interface CartSummaryProps {
    taxRate: number;
    shippingFee: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ taxRate, shippingFee }) => {
    const cartItems = useAppSelector(state => state.cart.items); // Access cart items from Redux

    // Calculate the subtotal, considering the discountPrice if available
    const subtotal = calculateTotal(cartItems);

    // Calculate tax based on the subtotal
    const tax = calculateTax(subtotal, taxRate);

    // Calculate final total considering the tax and shipping fee
    const total = calculateFinalTotal(cartItems, taxRate, shippingFee);

    return (
        <div className="cart-summary p-4 border rounded-md space-y-2">
            {/* Display subtotal */}
            <p className="flex justify-between text-sm font-medium">
                <span>Subtotal:</span> {formatPrice(subtotal)}
            </p>
            {/* Display tax */}
            <p className="flex justify-between text-sm font-medium">
                <span>Tax ({taxRate}%):</span> {formatPrice(tax)}
            </p>
            {/* Display shipping fee */}
            <p className="flex justify-between text-sm font-medium">
                <span>Shipping Fee:</span> {formatPrice(shippingFee)}
            </p>
            {/* Display total */}
            <h3 className="flex justify-between text-xl font-semibold">
                <span>Total:</span> {formatPrice(total)}
            </h3>
        </div>
    );
};

export default CartSummary;
