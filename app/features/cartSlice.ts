// app/features/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define the CartState interface
interface CartState {
    items: string[]; // Array of item IDs or product names
    itemCount: number;
  }
  
  // Set the initial state
  const initialState: CartState = {
    items: [],
    itemCount: 0,
  };
  
  // Create the cart slice
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      // Add an item to the cart
      addItem: (state, action: PayloadAction<string>) => {
        state.items.push(action.payload);
        state.itemCount = state.items.length; // Update the item count
      },
      
      // Remove an item from the cart
      removeItem: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item !== action.payload);
        state.itemCount = state.items.length; // Update the item count
      },
      
      // Clear all items in the cart
      clearCart: (state) => {
        state.items = [];
        state.itemCount = 0; // Reset item count
      },
      
      // Add multiple items to the cart at once
      addItems: (state, action: PayloadAction<string[]>) => {
        state.items.push(...action.payload);
        state.itemCount = state.items.length; // Update the item count
      },
      
      // Remove multiple items from the cart
      removeItems: (state, action: PayloadAction<string[]>) => {
        state.items = state.items.filter(item => !action.payload.includes(item));
        state.itemCount = state.items.length; // Update the item count
      },
      
      // Update the cart count manually (useful if you want to reset or set a specific count)
      setItemCount: (state, action: PayloadAction<number>) => {
        state.itemCount = action.payload;
      },
      
      // Update the entire cart (replace existing items with new ones)
      setCartItems: (state, action: PayloadAction<string[]>) => {
        state.items = action.payload;
        state.itemCount = state.items.length; // Update the item count
      },
    },
  });
  
  export const {
    addItem,
    removeItem,
    clearCart,
    addItems,
    removeItems,
    setItemCount,
    setCartItems,
  } = cartSlice.actions;
  
  export default cartSlice.reducer;
