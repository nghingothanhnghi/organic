// app/components/ArticleDisplay.tsx
import React from "react";
import type { ArticleDisplayProps } from "~/types/article";
import ArticleList from "./articleList";
import Pagination from "../pagination";
import PaginationSummary from "../paginationSummary";

const ArticleDisplay: React.FC<ArticleDisplayProps> = ({
  articles,
  pagination,
  currentPage,
  pageSize,
  onPageChange,
  loading,
  error,
  viewMode = "grid",
}) => {
  if (loading) {
    return <p className="text-center text-green-600">Loading articles...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <>
      <ArticleList searchResults={articles} viewMode={viewMode} />
      {pagination && (
        <div className="flex justify-between items-center mt-4">
          <PaginationSummary currentPage={currentPage} pageSize={pageSize} totalItems={pagination.total} />
          <Pagination currentPage={currentPage} totalPages={pagination.pageCount} onPageChange={onPageChange} />
        </div>
      )}
    </>
  );
};

export default ArticleDisplay;