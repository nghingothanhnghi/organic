// app/features/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '~/types/product';
import type { CartItem, CartState } from '~/types/cart';
import { toast } from 'react-toastify';
import { safeSessionStorage } from '~/utils/storage';

// Load cart items from sessionStorage if they exist
const initialState: CartState = {
    items: safeSessionStorage.getItem('cartItems') ? JSON.parse(safeSessionStorage.getItem('cartItems') || '[]') : [],
};

// Helper function to update sessionStorage safely
const updateSessionStorage = (items: CartItem[]) => {
    safeSessionStorage.setItem('cartItems', JSON.stringify(items));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const { id, price, discountPrice, name } = action.payload;
            // Calculate the finalPrice, using discountPrice if available
            const finalPrice = discountPrice && discountPrice < price ? discountPrice : price;
            const itemIndex = state.items.findIndex((item) => item.id === id);
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += 1;
                toast.info(`Increased quantity of ${name} in the cart.`);
            } else {
                state.items.push({ ...action.payload, quantity: 1, finalPrice });
                toast.success(`${name} added to the cart.`);
            }
            updateSessionStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
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
            safeSessionStorage.removeItem('cartItems');
            toast.error('Cart cleared.');
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
