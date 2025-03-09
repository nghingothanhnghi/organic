import type { Route } from "./+types/cart";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks";
import CartList from "~/components/cartList";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const {t} = useTranslation()
  return (
    <div className="cart-container">
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold mb-4">{t("page_title.cart")}</h1>
        <CartList />
      </div>
    </div>
  );
};

export default Cart;
