// routes/store.tsx
import type { Route } from "./+types/store";
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchProducts } from '~/features/productSlice';
import ProductList from '~/components/productList';
import Pagination from "~/components/pagination";
import Filter from "~/components/filter";

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
      <h1 className="text-2xl font-bold">Welcome to the Store</h1>
      <p className="text-gray-600">Browse our products and make your purchase!</p>
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
        {loading && <p className="text-blue-500">Loading products...</p>}
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
