// app/features/checkOutSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '~/types/cart';
import type { Order } from '~/types/order';
import { toast } from 'react-toastify';
import { createOrderAPI } from '~/services/orderService';

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

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
    'checkout/createOrder',
    async ({ items, shippingDetails, paymentDetails }: {
        items: CartItem[];
        shippingDetails: any;
        paymentDetails: any;
    }, { rejectWithValue }) => {
        try {
            // const orderData = { items, shippingDetails, paymentDetails };
            console.log("🟢 createOrder thunk called with:", { items, shippingDetails, paymentDetails });
            // Transform data to match Strapi API format
            const orderData = {
                totalAmount: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                tax: 0, // Calculate tax if applicable
                subTotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0), // Adjust as needed
                currency: "VND", // Example: hardcoded, or get from store settings
                notes: shippingDetails.notes || "",
                token: paymentDetails.transactionToken || null,
                purchaseOrder: "", // Strapi field, assign dynamically if needed
                status: "Pending", // Default status
                items: items.map(item => ({
                    product: item.id, 
                    quantity: item.quantity,
                    price: item.price
                })),
                user: shippingDetails.userId || null,
                receivedCash: paymentDetails.amountPaid || 0,
                shippingFee: paymentDetails.deliveryFee || 0,
                qrCodeData: paymentDetails.qrData || "",
                qrCodeUrl: paymentDetails.qrLink || "",
                balance: paymentDetails.remainingBalance || 0,
                customer: shippingDetails.customerId || null,
                paymentMethod: paymentDetails.paymentMode || null,
                receipt: paymentDetails.receiptId || null,
                store: shippingDetails.storeId || null,
                shipment: shippingDetails.shipmentId || null,
                orderType: shippingDetails.typeOfOrder || 0,
                guestCheckout: shippingDetails.isGuestCheckout || false
            };

            // **LOG THE TRANSFORMED DATA BEFORE SENDING IT**
            console.log("🚀 Transformed Order Data:", JSON.stringify(orderData, null, 2));

            const response = await createOrderAPI(orderData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to create order');
        }
    }
);

const checkOutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        startCheckout: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },

        submitOrder: (state, action: PayloadAction<{ items: CartItem[]; shippingDetails: any }>) => {
            state.loading = true;
            state.error = null;
            const { items, shippingDetails } = action.payload;
            state.order = {
                id: Date.now(), // Temporary ID for client-side simulation
                items,
                shippingDetails,
                status: 'Pending',
                purchaseOrder: "",
            };
            state.loading = false;
            state.success = true;
            toast.success('Order successfully created!');
        },

        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        },

        clearOrder: (state) => {
            state.order = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },

        resetCheckoutState: (state) => {
            state.success = false;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
                // state.order = {
                //     ...action.payload,
                //     purchaseOrder: action.payload.purchaseOrder || "", // Ensure it exists
                // };
                toast.success('Order successfully created!');
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(state.error);
            });
    },
});

export const {
    startCheckout,
    submitOrder,
    setError,
    clearOrder,
    resetCheckoutState,
} = checkOutSlice.actions;
export default checkOutSlice.reducer;
