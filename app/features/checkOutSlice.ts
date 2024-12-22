// app/features/checkOutSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '~/types/cart';
import type { Order } from '~/types/order';
import { toast } from 'react-toastify';

interface CheckoutState {
    order: Order | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: CheckoutState = {
    order: null,
    loading: false,
    error: null,
    success: false,
};

const checkOutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        // Start checkout process
        startCheckout: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        
        // Submit the order
        submitOrder: (state, action: PayloadAction<{ items: CartItem[]; shippingDetails: any }>) => {
            state.loading = true;
            state.error = null;
            // Simulate an API call or a real order submission
            setTimeout(() => {
                const { items, shippingDetails } = action.payload;
                const orderData = {
                    id: Date.now(), // Example ID, replace with backend response
                    items,
                    shippingDetails,
                    status: 'Pending',
                };
                state.order = orderData;
                state.loading = false;
                state.success = true;
                toast.success('Order successfully created!');
            }, 1000); // Simulating a delay for order submission
        },

        // Set error in case of failure
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        },

        // Clear order (reset the checkout process)
        clearOrder: (state) => {
            state.order = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },

        // Reset checkout state after success
        resetCheckoutState: (state) => {
            state.success = false;
            state.loading = false;
        }
    }
});

export const { startCheckout, submitOrder, setError, clearOrder, resetCheckoutState } = checkOutSlice.actions;
export default checkOutSlice.reducer;
