// app/features/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '~/types/product';
import { toast } from 'react-toastify';

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
                toast.info(`Increased quantity of ${action.payload.name} in the cart.`);
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
                toast.success(`${action.payload.name} added to the cart.`);
            }
            updateSessionStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            // state.items = state.items.filter((item) => item.id !== action.payload);
            // updateSessionStorage(state.items);
            const removedItem = state.items.find((item) => item.id === action.payload);
            state.items = state.items.filter((item) => item.id !== action.payload);
            updateSessionStorage(state.items);
            if (removedItem) {
                toast.warn(`${removedItem.name} removed from the cart.`);
            }
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
            toast.error('Cart cleared.');
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
