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
    { label: t("page_title.post"), path: "/articles" },
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
      <div className="max-w-screen-xl mx-auto flex-column items-center justify-between py-4 px-6">
      <h1 className="text-2xl font-bold mb-4">{t("page_title.post")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-8 w-full">
        <div className="col-span-1 lg:col-span-6 w-full lg:pe-10">
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
      </div>
    </div>
  );
};

export default Articles;