import type { Route } from "./+types/wish";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks";
import WishList from "~/components/wishList";
import { useTranslation } from "react-i18next";
import Breadcrumb from "~/components/breadcrumb";

const Wish = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("page_title.home"), path: "/" },
    { label: t("page_title.wishlist"), path: "/wishlist" },
  ];

  return (
    <div className="wishlist-container">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-screen-xl mx-auto flex-column items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold mb-4">{t("page_title.wishlist")}</h1>
        <WishList />
      </div>
    </div>
  );
};

export default Wish;
