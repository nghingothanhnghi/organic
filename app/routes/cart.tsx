import type { Route } from "./+types/cart";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks";
import CartList from "~/components/cartList";

const Cart = () => {
  return (
    <div className="cart-container">
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
        <CartList />
      </div>
    </div>
  );
};

export default Cart;
