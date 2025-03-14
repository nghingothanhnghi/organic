import React from "react";
import ArticleCard from "./articleCard";
import type { ArticleListProps } from "~/types/article";

const ArticleList: React.FC<ArticleListProps> = ({ searchResults, viewMode }) => {
  return searchResults.length ? (
    <div className={`grid ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col"}`}>
      {searchResults.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  ) : (
    <div className="text-center text-gray-500">No articles found.</div>
  );
};

export default ArticleList;