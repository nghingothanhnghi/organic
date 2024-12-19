// app/components/ProductDisplay.tsx
import React from "react";
import type { ProductDisplayProps } from "~/types/product";
import ProductList from "./productList";
import Pagination from "./pagination";
import PaginationSummary from "./paginationSummary";

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  products,
  pagination,
  currentPage,
  pageSize,
  onPageChange,
  loading,
  error,
  viewMode = "grid",
}) => {
  if (loading) {
    return (
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
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <>
      <ProductList searchResults={products} viewMode={viewMode} />
      {pagination && (
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <PaginationSummary
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={pagination.total}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.pageCount}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default ProductDisplay;
