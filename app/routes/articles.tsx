// app/routes/articles.tsx
import type { Route } from "./+types/articles";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { fetchArticles, setFilters } from "~/features/articleSlice";
import ArticleDisplay from "~/components/article/articleDisplay";
import Breadcrumb from "~/components/breadcrumb";
import { useTranslation } from "react-i18next";

const Articles = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t("page_title.home"), path: "/" },
    { label: t("page_title.articles"), path: "/articles" },
  ];
  const dispatch = useAppDispatch();
  const { articles, loading, error, pagination, filters } = useAppSelector((state) => state.articles);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, pageSize, filters }));
  }, [dispatch, currentPage, pageSize, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="store-container">
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
      <h1 className="text-2xl font-bold mb-4">Bài viết</h1>
        <ArticleDisplay
          articles={articles}
          pagination={pagination}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          loading={loading}
          error={error}
          viewMode="list"
        />
      </div>
    </div>
  );
};

export default Articles;