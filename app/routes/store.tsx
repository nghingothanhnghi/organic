// routes/store.tsx
import type { Route } from "./+types/store";
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchProducts } from '~/features/productSlice';
import ProductList from '~/components/productList';
import Pagination from "~/components/pagination";
import Hero from "~/components/hero";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Store" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Store = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error, pagination } = useAppSelector(state => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Example page size

  // Fetch products with pagination
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="store-container">
      <Hero
        title="Welcome to the Store"
        description="Browse our products and make your purchase!"
      />
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        {loading && (
          <div className="flex justify-center items-center space-x-2">
            <svg
              className="animate-spin h-10 w-10 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span>Loading products...</span>
          </div>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <ProductList searchResults={products} viewMode="grid" />

            {/* Use the Pagination component here */}
            {pagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.pageCount}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Store;
