// app/store.ts

import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here
import storeReducer from '~/features/storeSlice'; // Import the store slice
import pageReducer from "~/features/pageSlice"
import authReducer from '~/features/authSlice'
import cartReducer from '~/features/cartSlice'
import wishlistReducer from '~/features/wishlistSlice'
import checkoutReducer from '~/features/checkOutSlice'
import orderReducer from "~/features/orderSlice"
import productReducer from '~/features/productSlice'
import contentReducer from '~/features/contentSlice'
import menuReducer from '~/features/menuSlice'
import reviewReducer from '~/features/reviewSlice';
import articleReducer from '~/features/articleSlice';
import bannerReducer from '~/features/bannerSlice';

export const store = configureStore({
  reducer: {
    stores: storeReducer,
    pages: pageReducer,
    menu: menuReducer,
    cart: cartReducer, // This will be your cart reducer (you can add more slices here)
    checkout: checkoutReducer,
    orders: orderReducer,
    products: productReducer, 
    sections: contentReducer,
    auth: authReducer,
    reviews: reviewReducer,
    wishlist: wishlistReducer,
    articles: articleReducer,
    banners: bannerReducer
  },
});

// Export types for use in your components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
