// app/components/article/articleCard.tsx
import React from "react";
import { Link } from "react-router";
import ArticleThumb from "./articleThumb";
import type { ArticleCardProps } from "~/types/article"

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const { title, slug, description, publishedAt } = article;

  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
        <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
          <ArticleThumb article={article} className="object-cover w-full h-full" width={400} height={400}/>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            <Link to={`/articles/${slug}`} className="hover:text-blue-500">
              {title}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 truncate">{description}</p>
          <span className="text-xs text-gray-400">{publishedAt}</span>
        </div>
      </div>
    );
  };
  
  export default ArticleCard;