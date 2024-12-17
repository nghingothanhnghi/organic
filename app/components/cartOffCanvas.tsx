import React from "react";
import CartList from "./cartList";
import CartSummary from "./cartSummary";
import ProceedToCheckoutButton from "./proceedToCheckoutButton";

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
  return (
    <>
      {/* Cart Off-canvas */}
      <div
        className={`fixed flex flex-col top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        {/* Header */}
        <div className="flex justify-between p-4 border-b border-gray-300 sticky top-0">
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
          <CartList />
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-3">
          <CartSummary taxRate={10} shippingFee={15} />
          <ProceedToCheckoutButton closeCart={closeCart} />
        </div>
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
