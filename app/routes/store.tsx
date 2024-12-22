// routes/store.tsx
import type { Route } from "./+types/store";
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchProducts, setFilters } from '~/features/productSlice';
import ProductFilter from "~/components/productFilter";
import ProductDisplay from "~/components/productDisplay";
import Hero from "~/components/hero";
import Breadcrumb from "~/components/breadcrumb";
import { useTranslation } from "react-i18next";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Store" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Store = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("page_title.home"), path: '/' },
    { label: t("page_title.store"), path: '/products' },
  ];
  const dispatch = useAppDispatch();
  const { products, loading, error, pagination, filters } = useAppSelector(state => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Example page size

  // Fetch products with pagination
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, pageSize, filters }));
  }, [dispatch, currentPage, pageSize, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    // Dispatch the setFilters action to update filters in the store
    dispatch(setFilters(newFilters));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  useEffect(() => {
    console.log("pagination:", pagination);
  }, [pagination]);

  return (
    <div className="store-container">
      <Breadcrumb items={breadcrumbItems} />
      <Hero
        title="Welcome to the Store"
        description="Browse our products and make your purchase!"
      />
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        <ProductFilter onFilterChange={handleFilterChange} />
        <ProductDisplay
          products={products}
          pagination={pagination}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          loading={loading}
          error={error}
          viewMode="grid"
        />
      </div>
    </div>
  );
};

export default Store;
