// routes/store.tsx
import type { Route } from "./+types/store";
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";
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
    { label: t("page_title.store"), path: '/store' },
  ];
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useAppDispatch();
  const { products, loading, error, pagination, filters } = useAppSelector(state => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Example page size


    // Function to parse query parameters
    const getFiltersFromQuery = () => {
      const queryParams = new URLSearchParams(location.search);
      const newFilters: Record<string, string> = {};
  
      queryParams.forEach((value, key) => {
        newFilters[key] = decodeURIComponent(value);
      });

      console.log("Extracted query parameters:", newFilters);
  
      return newFilters;
    };
  
    // Effect to update filters when the URL changes
    useEffect(() => {
      const queryFilters = getFiltersFromQuery();
      dispatch(setFilters(queryFilters)); // Update Redux store filters
      setCurrentPage(1); // Reset to first page on filter change

      console.log("Updated filters in Redux:", queryFilters);

    }, [location.search, dispatch]);

  // Fetch products with pagination
  useEffect(() => {
    console.log("Fetching products with filters:", filters);
    dispatch(fetchProducts({ page: currentPage, pageSize, filters }));
  }, [dispatch, currentPage, pageSize, filters]);

  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    console.log("Applying new filters:", newFilters);
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
      {/* <Hero
        title="Welcome to the Store"
        description="Browse our products and make your purchase!"
      /> */}
      <div className="container mx-auto max-w-full lg:max-w-7xl flex-column items-center justify-between p-3 sm:py-4 sm:px-6">
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
