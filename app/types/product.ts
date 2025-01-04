// app/types/product.ts
import type { Store } from "./store";
import type { Category } from "./category";
import type { Brand } from "./brand";
import type { PaginationMeta } from "./pagination";

// Product interface for the Redux state (matching the state in productSlice)
export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    quantity: number;
    bestseller: boolean,
    discount: boolean,
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
    productImg: ProductImage[];
    ratings: Rating[]; // Updated to use Rating type
    crossSellProducts?: Partial<Product>[];
    variants?: ProductVariant[]; 
  }
  
  // Redux state interface
  export interface ProductState {
    products: Product[]; // Array of Product
    product: Product | null;
    loading: boolean;
    error: string | null;
    pagination: PaginationMeta | null;
    filters: Record<string, any>;
  }

// Rating interface for each review
export interface Rating {
  id: number;
  attributes: {
    score: number; // Rating score (e.g., 1-5 stars)
    reviewText: string; // Review text
    users_permissions_user: {
      data: {
        username: string; // Username of the reviewer
      };
    };
  };
}

  export interface ProductImage {
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

export interface ProductCardProps {
    product: Product; // Expect the whole product object
}

// Props for the ProductPrice component
export interface ProductPriceProps {
  product: Product;
  variant?: ProductVariant;
  className?: string;
}

export interface ProductListProps {
    searchResults: Product[]; // Array of products
    viewMode: "grid" | "list"; // Controls layout
}

// Variant interface for product variants like color, size, etc.
export interface ProductVariant {
  id: number; // Unique identifier for the variant
  name: string; // Name of the variant (e.g., "Color", "Size")
  value: string; // Value of the variant (e.g., "Red", "Medium")
  price?: number; // Optional price if the variant has a different price
  discountPrice?: number;
  stock: number; // Stock quantity of the variant
  image: string | null;
  media: ProductImage | null;
  sku?: string; // Optional SKU for the variant
  isDefault: boolean; // Whether this is the default variant selection
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
