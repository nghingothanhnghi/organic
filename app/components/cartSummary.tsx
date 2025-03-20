// app/components/cartSummary.tsx
import React from 'react';
import { useAppSelector } from '~/hooks';
import { formatPrice } from '~/utils/formatPrice';
import { calculateTotal, calculateTax, calculateFinalTotal } from '~/utils/calculate';
import { useTranslation } from 'react-i18next';

interface CartSummaryProps {
    taxRate: number;
    shippingFee: number;
    className?: string;
    onTotalChange?: (total: number) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ taxRate, shippingFee, className, onTotalChange }) => {
    const {t} = useTranslation();
    const cartItems = useAppSelector(state => state.cart.items); // Access cart items from Redux

    // Calculate the subtotal, considering the discountPrice if available
    const subtotal = calculateTotal(cartItems);

    // Calculate tax based on the subtotal
    const tax = calculateTax(subtotal, taxRate);

    // Calculate final total considering the tax and shipping fee
    const total = calculateFinalTotal(cartItems, taxRate, shippingFee);

    
    // Pass total to parent when component renders
    React.useEffect(() => {
        if (onTotalChange) {
            onTotalChange(total);
        }
    }, [total, onTotalChange]); // Run whenever total changes

    return (
        <div className={`cart-summary bg-gray-100 p-4 border rounded-md space-y-2 ${className || ''}`}>
            {/* Display subtotal */}
            <p className="flex justify-between text-sm font-medium">
                <span>{t("dataGrid.headerName.subTotal")} </span> {formatPrice(subtotal)}
            </p>
            {/* Display tax */}
            <p className="flex justify-between text-sm font-medium">
                <span>{t("dataGrid.headerName.tax")} ({taxRate}%)</span> {formatPrice(tax)}
            </p>
            {/* Display shipping fee */}
            <p className="flex justify-between text-sm font-medium">
                <span>{t("dataGrid.headerName.shippingFee")}</span> {formatPrice(shippingFee)}
            </p>
            {/* Display total */}
            <h3 className="flex justify-between text-xl font-semibold">
                <span>{t("dataGrid.headerName.totalAmount")}</span> <span className='text-orange-700'>{formatPrice(total)}</span>
            </h3>
        </div>
    );
};

export default CartSummary;
