// app/types/product.ts
import type { Store } from "./store";
import type { Category } from "./category";
import type { Brand } from "./brand";

// Product interface for the Redux state (matching the state in productSlice)
export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    quantity: number;
    bestseller: boolean,
    discountPrice?: number; // Optional
    featured?: boolean; // Optional
    productSku?: string; // Optional
    availableStartDate?: string | null; // Optional
    availableEndDate?: string | null; // Optional
    store?: Store; // Optional store information
    categories?: Category[]; // Array of categories
    brand?: Brand; // Associated brand information
    createdAt?: string; // ISO Date
    updatedAt?: string; // ISO Date
    publishedAt?: string; // ISO Date
    slug?: string | null; // Optional
  }
  
  // Redux state interface
  export interface ProductState {
    products: Product[]; // Array of Product
    loading: boolean;
    error: string | null;
    pagination: PaginationMeta | null;
    filters: Record<string, any>;
  }

  export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }

export interface ProductListProps {
    searchResults: Product[]; // Array of products
    viewMode: "grid" | "list"; // Controls layout
}


// Props for the Product Display component
export interface ProductDisplayProps {
  products: Product[]; // Array of products
  pagination: PaginationMeta | null; // Pagination information
  currentPage: number; // Current active page
  pageSize: number; // Number of items per page
  onPageChange: (page: number) => void; // Handler for page change
  loading: boolean; // Loading state
  error: string | null; // Error message
  viewMode?: "grid" | "list"; // Optional view mode, default is "grid"
}
