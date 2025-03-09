// app/features/wishlistSlice.ts
import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '~/types/product';
import { toast } from 'react-toastify';
import { safeSessionStorage } from '~/utils/storage';

export interface WishlistState {
  items: Product[];
}

// Initialize state from sessionStorage, if available
const storedWishlist = safeSessionStorage.getItem('wishlistItems');
const initialState: WishlistState = {
  items: storedWishlist ? JSON.parse(storedWishlist) : [],
};

// Helper to update sessionStorage for wishlist
const updateWishlistStorage = (items: Product[]) => {
  safeSessionStorage.setItem('wishlistItems', JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        toast.success(`${action.payload.name} added to your wishlist.`);
      } else {
        toast.info(`${action.payload.name} is already in your wishlist.`);
      }
      updateWishlistStorage(state.items);
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      const removedItem = state.items.find(item => item.id === action.payload);
      state.items = state.items.filter(item => item.id !== action.payload);
      if (removedItem) {
        toast.warn(`${removedItem.name} removed from your wishlist.`);
      } else {
        toast.error('Item not found in your wishlist.');
      }
      updateWishlistStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      safeSessionStorage.removeItem('wishlistItems');
      toast.info('Wishlist cleared.');
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
