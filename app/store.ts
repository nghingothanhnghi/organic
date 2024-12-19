// app/store.ts

import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here
import cartReducer from '~/features/cartSlice'
import productReducer from '~/features/productSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer, // This will be your cart reducer (you can add more slices here)
    products: productReducer, 
  },
});

// Export types for use in your components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
