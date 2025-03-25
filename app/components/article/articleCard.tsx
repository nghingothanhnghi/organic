// app/components/article/articleCard.tsx
import React from "react";
import { Link } from "react-router";
import ArticleThumb from "./articleThumb";
import PublishedDate from "./publishedDate";
import type { ArticleCardProps } from "~/types/article"
import { formatDateTime } from "~/utils/formatDateTime";
import { useTranslation } from "react-i18next"; // Import i18next


interface ExtendedArticleCardProps extends ArticleCardProps {
  viewMode: "grid" | "list"; // Add viewMode prop
}

const ArticleCard: React.FC<ExtendedArticleCardProps> = ({ article, viewMode }) => {
  const { i18n } = useTranslation();
    const { title, slug, description, publishedAt } = article;

    return (
      <div 
      // className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg"
      className={`bg-white ${
        viewMode === "grid" 
        ? "transition transform rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-lg" 
        : "lg:max-w-full lg:flex lg:space-x-3"
      }`}
      >
        <div 
          // className="relative w-full h-56 bg-gray-200 overflow-hidden"
          className={`${
            viewMode === "grid" 
            ? "relative w-full h-56 bg-gray-200 overflow-hidden" 
            : "lg:max-w-full lg:w-48 flex-shrink-0 border border-gray-300 rounded-lg"
          }`}
          >
          <ArticleThumb article={article} className="object-cover w-full h-full rounded-lg" />
        </div>
        <div className="p-4">
        <PublishedDate date={publishedAt} />
        {/* <time className="text-xs text-gray-400">{publishedAt ? formatDateTime(publishedAt, true, "24-hour", i18n.language || "vi") : "N/A"}</time> */}
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            <Link to={`/articles/${slug}`} className="hover:text-blue-500">
              {title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-gray-600 leading-8">{description}</p>      
        </div>
      </div>
    );
  };
  
  export default ArticleCard;