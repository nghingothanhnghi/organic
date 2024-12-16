import type { Route } from "./+types/cart";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks";
import CartList from "~/components/cartList";
import UserShippingInfo from "~/components/checkoutProcess/userShippingInfo";
import UserPaymentInfo from "~/components/checkoutProcess/userPaymentInfo";
import UserConfirmInfo from "~/components/checkoutProcess/userConfirmInfo";

const CheckOut = () => {
    const handleCheckout = () => {
        // Handle the checkout process here (e.g., redirect to payment page, submit order, etc.)
        alert('Proceeding to payment');
    };
    return (
        <div className="CheckOut-container">
            <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
                <h1 className="text-2xl font-bold mb-4">CheckOut</h1>
                {/* Shipping Information */}
                <UserShippingInfo />

                {/* Payment Information */}
                <UserPaymentInfo />

                {/* Order Confirmation */}
                <UserConfirmInfo />
                <CartList />
                <div className="mt-6">
                    <button
                        onClick={handleCheckout}
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
