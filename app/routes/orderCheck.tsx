// routes/store.tsx
import type { Route } from "./+types/orderCheck";
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import Hero from "~/components/hero";
import Breadcrumb from "~/components/breadcrumb";
import { useTranslation } from "react-i18next";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "OrderCheck" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const OrderCheck = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("page_title.home"), path: '/' },
    { label: t("page_title.store"), path: '/products' },
  ];
  const dispatch = useAppDispatch();
  const { products, loading, error, pagination, filters } = useAppSelector(state => state.products);


  return (
    <div className="store-container">
      <Breadcrumb items={breadcrumbItems} />
      <Hero
        title="Welcome to the OrderCheck"
        description="Browse our products and make your purchase!"
      />
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        
      </div>
    </div>
  );
};

export default OrderCheck;
