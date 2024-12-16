// app/features/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '~/types/product';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

// Helper function to update sessionStorage safely
const updateSessionStorage = (items: CartItem[]) => {
    if (typeof window !== 'undefined') {  // Check if window is defined (browser environment)
        sessionStorage.setItem('cartItems', JSON.stringify(items));
    }
};

// Load cart items from sessionStorage if they exist
const initialState: CartState = {
    items: typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('cartItems') || '[]') : [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            updateSessionStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            updateSessionStorage(state.items);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity = action.payload.quantity;
            }
            updateSessionStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            if (typeof window !== 'undefined') {  // Check if window is defined (browser environment)
                sessionStorage.removeItem('cartItems');
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
