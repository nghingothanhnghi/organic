// app/features/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '~/types/product';

// Define the CartState interface
interface CartState {
    items: Product[]; // Array of products instead of just item IDs or names
    itemCount: number;
    
}

// Load the cart data from localStorage (if it exists)
const loadCartFromLocalStorage = (): CartState => {
    if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            return JSON.parse(savedCart); // Parse the saved cart from JSON
        }
    }
    return { items: [], itemCount: 0 }; // Return initial state if no cart is saved
};

// Set the initial state from localStorage
const initialState: CartState = loadCartFromLocalStorage();

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add an item to the cart (now accepts the full product object)
        addItem: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload); // Add the product object to the items array
            state.itemCount = state.items.length; // Update the item count
            // Save the updated state to localStorage (only in the browser)
            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        // Remove an item from the cart by matching the product ID
        removeItem: (state, action: PayloadAction<number>) => { // Use 'number' instead of 'string' for ID
            state.items = state.items.filter(item => item.id !== action.payload); // Filter by product ID
            state.itemCount = state.items.length; // Update the item count
            // Save the updated state to localStorage (only in the browser)
            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },

        // Clear all items in the cart
        clearCart: (state) => {
            state.items = [];
            state.itemCount = 0; // Reset item count
            // Save the cleared state to localStorage (only in the browser)
            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },

        // Add multiple items to the cart at once (accepts an array of product objects)
        addItems: (state, action: PayloadAction<Product[]>) => {
            state.items.push(...action.payload); // Add multiple product objects to the items array
            state.itemCount = state.items.length; // Update the item count
            // Save the updated state to localStorage (only in the browser)
            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },

        // Remove multiple items from the cart by matching product IDs
        removeItems: (state, action: PayloadAction<number[]>) => { // Use 'number[]' instead of 'string[]'
            state.items = state.items.filter(item => !action.payload.includes(item.id)); // Filter by product IDs
            state.itemCount = state.items.length; // Update the item count
            // Save the updated state to localStorage (only in the browser)
            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },

        // Update the cart count manually (useful if you want to reset or set a specific count)
        setItemCount: (state, action: PayloadAction<number>) => {
            state.itemCount = action.payload;
            // Save the updated state to localStorage (only in the browser)
            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },

        // Update the entire cart (replace existing items with new ones)
        setCartItems: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload; // Replace items with a new array of product objects
            state.itemCount = state.items.length; // Update the item count
            // Save the updated state to localStorage (only in the browser)
            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(state));
            }
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
