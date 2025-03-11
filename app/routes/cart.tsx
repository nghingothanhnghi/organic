import type { Route } from "./+types/cart";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks";
import CartList from "~/components/cartList";
import CartSummary from "~/components/cartSummary";
import ProceedToCheckoutButton from "~/components/proceedToCheckoutButton";
import { useTranslation } from "react-i18next";
import EmptyState from "~/components/emptyState";

const Cart = () => {
  const { t } = useTranslation();
  const cartItems = useAppSelector(state => state.cart.items);


  // Example values; adjust as needed.
  const taxRate = 10; // 10%
  const shippingFee = 5; // $5 shipping fee

  return (
    <div className="cart-container">
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold mb-4">{t("page_title.cart")}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-8 w-full">
          <div className="col-span-1 lg:col-span-6 w-full lg:pe-10">
            <CartList />
          </div>
          <div className="col-span-1 lg:col-span-4 w-full">
            <CartSummary taxRate={taxRate} shippingFee={shippingFee} />
            <div className="mt-6">
              <ProceedToCheckoutButton closeCart={() => { }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
