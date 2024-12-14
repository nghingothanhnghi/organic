// routes/store.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '~/features/productSlice';
import type { RootState, AppDispatch } from '~/store';
import ProductList from '~/components/productList';

const Store = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);
  
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
