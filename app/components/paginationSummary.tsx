// app/components/paginationSummary.tsx
import React from 'react';

interface PaginationSummaryProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

const PaginationSummary: React.FC<PaginationSummaryProps> = ({
  currentPage,
  pageSize,
  totalItems,
}) => {
  // Calculate the start and end items being displayed
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-4 text-gray-700 font-semibold">
      Showing {startItem}–{endItem} of {totalItems} results
    </div>
  );
};

export default PaginationSummary;
