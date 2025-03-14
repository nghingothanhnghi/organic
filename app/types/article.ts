// app/types/article.ts

import type { PaginationMeta } from "./pagination";

// Article interface for the Redux state (matching the state in productSlice)
export interface Article {
  id: number;
  title: string;
  description: string;
  createdAt?: string; // ISO Date
  updatedAt?: string; // ISO Date
  publishedAt?: string; // ISO Date
  slug?: string | null; // Optional
  media: ArticleImage[];
  imageUrl?: string
}

// Redux state interface
export interface ArticleState {
  articles: Article[]; // Array of Article
  article: Article | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
  filters: Record<string, any>;
}

export interface ArticleImage {
  id: number;
  attributes: {
    name: string;
    url: string;
    formats: {
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
      small: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface ArticleCardProps {
  article: Article; // Expect the whole product object
}

export interface ArticleListProps {
  searchResults: Article[]; // Array of articles
  viewMode: "grid" | "list"; // Controls layout
}

// Props for the Article Display component
export interface ArticleDisplayProps {
  articles: Article[]; // Array of articles
  pagination: PaginationMeta | null; // Pagination information
  currentPage: number; // Current active page
  pageSize: number; // Number of items per page
  onPageChange: (page: number) => void; // Handler for page change
  loading: boolean; // Loading state
  error: string | null; // Error message
  viewMode?: "grid" | "list"; // Optional view mode, default is "grid"
}
