import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/hooks";
import CartList from "./cartList";
import CartSummary from "./cartSummary";
import ProceedToCheckoutButton from "./proceedToCheckoutButton";
import { useTranslation } from "react-i18next";

interface CartOffCanvasProps {
  isOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartOffCanvas: React.FC<CartOffCanvasProps> = ({
  isOpen,
  toggleCart,
  closeCart,
}) => {
  const {t} = useTranslation();
  
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items); // Get cart items from Redux

  const isCartEmpty = cartItems.length === 0; // Check if the cart is empty

  

  const handleNavigateToStore = () => {
    closeCart(); // Close the cart before navigating
    navigate("/store"); // Adjust the path based on your routing setup
  };
  




  return (
    <>
      {/* Cart Off-canvas */}
      <div
        className={`fixed flex flex-col top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
      >
        {/* Header */}
        <div className="flex justify-between p-4 sticky top-0">
          <div className="font-bold text-lg">Your Cart</div>
          <button onClick={toggleCart} className="text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-scroll">
          {isCartEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
              <p className="text-gray-800 text-md font-semibold mb-4">{t("info.cart.message_01")}</p>
              <button
                onClick={handleNavigateToStore}
                className="mt-4 px-4 py-2 text-white rounded-md bg-gradient-to-r from-sky-500 from-10% to-emerald-500 to-90% hover:from-emerald-500 hover:to-sky-500"
              >
                Browse Store
              </button>
            </div>
          ) : (
            <CartList />
          )}
        </div>

        {/* Footer */}
        {!isCartEmpty && (
          <div className="sticky bottom-0 p-3">
            <CartSummary taxRate={10} shippingFee={15} />
            <ProceedToCheckoutButton closeCart={closeCart} />
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
};

export default CartOffCanvas;
