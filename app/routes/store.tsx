// routes/store.tsx
import type { Route } from "./+types/store";
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchProducts } from '~/features/productSlice';
import ProductList from '~/components/productList';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Store" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Store = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector(state => state.products);
  
    useEffect(() => {
      dispatch(fetchProducts()); // Fetch products when the component mounts
    }, [dispatch]);
  
    return (
      <div className="store-container">
        <h1 className="text-2xl font-bold">Welcome to the Store</h1>
        <p className="text-gray-600">Browse our products and make your purchase!</p>
  
        {loading && <p className="text-blue-500">Loading products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <ProductList searchResults={products} viewMode="grid" />
        )}
      </div>
    );
  };
  
  export default Store;
