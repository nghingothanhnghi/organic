// app/components/paginationSummary.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const {t} = useTranslation();
  // Calculate the start and end items being displayed
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-4 text-gray-700">
      {t("paging.showing")} {startItem}–{endItem} {t("paging.of")} {totalItems} {t("paging.results")}
    </div>
  );
};

export default PaginationSummary;
