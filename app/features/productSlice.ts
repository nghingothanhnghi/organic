// app/features/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI } from '~/services/productService';
import type { ProductState } from '~/types/product';

// Initial state
const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
  };

// Async thunk to fetch products from the API using the service
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts', // Action name
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetchProductsAPI(); // Call the service function
        // Extract and flatten the data from the response
        const products = response.data.map((product: any) => ({
          id: product.id,
          name: product.attributes.name,
          price: product.attributes.price ?? 0, // Fallback to 0 if price is null or undefined,
          description: product.attributes.description,
        }));
        return products; // Return the flattened products array
      } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to load products');
      }
    }
  );

// Product slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // You can add any local reducer logic if necessary
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true; // Set loading to true when the request starts
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when the request succeeds
                state.products = action.payload; // Store the fetched products
                console.log('Fetched products:', action.payload); 
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false; // Set loading to false when the request fails
                state.error = action.payload as string; // Store the error message
            });
    },
});

export default productSlice.reducer;
