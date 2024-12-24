import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchOrdersAPI } from "~/services/orderService";
import type { Order, OrderState } from "~/types/order";
import type { PaginationMeta } from '~/types/pagination';

// Initial state with filters included
const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    pagination: null,
    filters: {}, // Add filters to the state
};

// Async thunk to fetch orders from the API, including filters
export const fetchOrders = createAsyncThunk<
  { orders: Order[]; pagination: PaginationMeta },
  { page: number; pageSize: number; filters?: Record<string, any> }, // Arguments for pagination and filters
  { rejectValue: string | undefined } // Explicitly define the reject value type
>(
  'orders/fetchOrders',
  async ({ page, pageSize, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await fetchOrdersAPI(page, pageSize, filters); // Call the service function with filters
      // Extract and flatten the data from the response
      const orders: Order[] = response.data.map((order: any) => ({
        id: order.id,
        purchaseOrder: order.attributes.purchaseOrder,
        totalAmount: order.attributes.totalAmount,
      }));

      const pagination: PaginationMeta = response.meta.pagination; // Extract pagination data
      return { orders, pagination }; // Return both orders and pagination meta
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load orders'); // Ensure error is a string
    }
  }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        // Action to set filters in the state
        setFilters(state, action: PayloadAction<Record<string, any>>) {
            state.filters = action.payload; // Update filters in the state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<{ orders: Order[]; pagination: PaginationMeta }>) => {
                state.orders = action.payload.orders || [];
                state.pagination = action.payload.pagination;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, action: PayloadAction<string | undefined>) => { // Allow undefined in rejected action
                state.error = action.payload || 'An error occurred while fetching orders'; // Handle undefined case
                state.loading = false;
            });
    },
});

export const { setFilters } = orderSlice.actions;

export default orderSlice.reducer;
