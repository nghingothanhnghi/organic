// app/types/product.ts
// Product interface for the Redux state (matching the state in productSlice)
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  // Redux state interface
  export interface ProductState {
    products: Product[]; // Array of Product
    loading: boolean;
    error: string | null;
  }

export interface ProductListProps {
    searchResults: Product[]; // Array of products
    viewMode: "grid" | "list"; // Controls layout
}

