// app/features/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '~/types/product';
import type { CartItem, CartState } from '~/types/cart';
import { toast } from 'react-toastify';
import { safeSessionStorage } from '~/utils/storage';
import { calculateFinalPrice } from '~/utils/calculate';

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
            const finalPrice = calculateFinalPrice(price, discountPrice);
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
            // state.items = state.items.filter((item) => item.id !== action.payload);
            // updateSessionStorage(state.items);
            // if (removedItem) {
            //     toast.warn(`${removedItem.name} removed from the cart.`);
            // }
            if (removedItem) {
                state.items = state.items.filter((item) => item.id !== action.payload);
                updateSessionStorage(state.items);
                toast.warn(`${removedItem.name} removed from the cart.`);
            } else {
                toast.error('Item not found in the cart.');
            }
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            // if (itemIndex !== -1) {
            //     state.items[itemIndex].quantity = action.payload.quantity;
            // }
            if (itemIndex !== -1) {
                if (action.payload.quantity > 0) {
                    state.items[itemIndex].quantity = action.payload.quantity;
                    toast.info(`Updated quantity of ${state.items[itemIndex].name} to ${action.payload.quantity}.`);
                } else {
                    toast.error('Quantity must be at least 1.');
                }
            } else {
                toast.error('Item not found in the cart.');
            }
            updateSessionStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            safeSessionStorage.removeItem('cartItems');
            toast.error('Cart cleared.');
        },
        updatePrices: (state, action: PayloadAction<{ id: number; price: number; discountPrice?: number }[]>) => {
            action.payload.forEach((product) => {
                const item = state.items.find((item) => item.id === product.id);
                if (item) {
                    item.finalPrice = calculateFinalPrice(product.price, product.discountPrice);
                }
            });
            updateSessionStorage(state.items);
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, updatePrices } = cartSlice.actions;
export default cartSlice.reducer;
