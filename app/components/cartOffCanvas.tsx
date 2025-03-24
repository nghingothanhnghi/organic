import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAppSelector } from "~/hooks";
import IconCartEmpty from "~/assets/empty.png";
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
  const { t } = useTranslation();

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
          <div className="flex w-full items-center justify-between space-x-3">
            <button onClick={toggleCart} className="text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            {/* <div className="font-bold text-lg">Your Cart</div> */}
          </div>
        </div>
        {/* Cart Content */}
        <div className="flex-1 overflow-y-scroll p-2 lg:p-3 bg-gray-100">
          {isCartEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <img src={IconCartEmpty} width={64} className="mb-1" />
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg> */}
              <p className="text-gray-800 text-md font-semibold mb-4">{t("info.cart.message_01")}</p>
              <button
                onClick={handleNavigateToStore}
                className="mt-4 flex items-center justify-center text-sm font-semibold px-4 py-2 text-white rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r from-sky-500 from-10% to-emerald-500 to-90% hover:from-emerald-500 hover:to-sky-500 transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 me-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>
                {t("btn.continue_shopping")}
              </button>
            </div>
          ) : (
            <CartList />
          )}
        </div>

        {/* Footer */}
        {!isCartEmpty && (
          <div className="sticky bottom-0 p-3">
            <CartSummary taxRate={10} shippingFee={15} className="mb-3" />
            <ProceedToCheckoutButton closeCart={closeCart} />
            <Link to="/cart" className="w-full flex items-center justify-center gap-2 mt-3 text-sm font-semibold px-4 py-2 text-gray-400 rounded-lg transition-colors duration-300 hover:text-gray-800 hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
              {t("btn.go_to_cart")}
            </Link>
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
