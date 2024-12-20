// app/store.ts

import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here
import authReducer from '~/features/authSlice'
import cartReducer from '~/features/cartSlice'
import productReducer from '~/features/productSlice'
import contentReducer from '~/features/contentSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer, // This will be your cart reducer (you can add more slices here)
    products: productReducer, 
    sections: contentReducer,
    auth: authReducer, 
  },
});

// Export types for use in your components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
