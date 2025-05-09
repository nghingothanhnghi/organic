import type { Route } from "./+types/cart";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks";
import CartList from "~/components/cartList";
import CartSummary from "~/components/cartSummary";
import ProceedToCheckoutButton from "~/components/proceedToCheckoutButton";
import { useTranslation } from "react-i18next";
import Breadcrumb from "~/components/breadcrumb";

const Cart = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("page_title.home"), path: "/" },
    { label: t("page_title.cart"), path: "/cart" },
  ];

  const cartItems = useAppSelector(state => state.cart.items);


  // Example values; adjust as needed.
  const taxRate = 10; // 10%
  const shippingFee = 5; // $5 shipping fee

  // Check if cart has items
  const hasItems = cartItems.length > 0;

  return (
    <div className="cart-container">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-screen-xl mx-auto flex-column items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold mb-4">{t("page_title.cart")}</h1>
        <div className={`grid grid-cols-1 ${hasItems ? 'lg:grid-cols-10' : ''} gap-4 lg:gap-8 w-full`}>
          <div className={`w-full ${hasItems ? 'col-span-1 lg:col-span-6 lg:pe-10' : 'lg:col-span-10'}`}>
            <CartList />
          </div>
          {hasItems && (
            <div className="col-span-1 lg:col-span-4 w-full">
              <CartSummary taxRate={taxRate} shippingFee={shippingFee} />
              <div className="mt-6">
                <ProceedToCheckoutButton closeCart={() => { }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
