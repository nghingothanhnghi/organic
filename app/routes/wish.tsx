import type { Route } from "./+types/wish";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks";
import WishList from "~/components/wishList";
import { useTranslation } from "react-i18next";

const Wish = () => {
  const { t } = useTranslation()
  return (
    <div className="wishlist-container">
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold mb-4">{t("page_title.wishlist")}</h1>
        <WishList />
      </div>
    </div>
  );
};

export default Wish;
