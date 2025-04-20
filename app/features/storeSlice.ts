// app/features/storeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStoresAPI } from '~/services/storeService';
import type { Product } from '~/types/product'; // Import the Product type


interface Store {
    id: number;
    customerId: string;
    storeName: string;
    storeStatus: boolean;
    createdAt: string;
    updatedAt: string;
    address: string; // New field
    state: string;   // New field
    district: string; // New field
    items: Product[]; // Use Product type for items
    // Add other fields as necessary
}

interface StoreState {
    stores: Store[];
    loading: boolean;
    error: string | null;
    filters: Record<string, any>;
}

const initialState: StoreState = {
    stores: [],
    loading: false,
    error: null,
    filters: {},
};

// Async thunk to fetch stores from the API
export const fetchStores = createAsyncThunk<
    Store[],
    Record<string, any>,
    { rejectValue: string }
>(
    'stores/fetchStores',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await fetchStoresAPI(filters);
            // Flatten the data structure
            const stores: Store[] = response.data.map((store: any) => ({
                id: store.id,
                customerId: store.attributes.customerId,
                storeName: store.attributes.storeName,
                storeStatus: store.attributes.storeStatus,
                createdAt: store.attributes.createdAt,
                updatedAt: store.attributes.updatedAt,
                address: store.attributes.address, // Map new field
                state: store.attributes.state,     // Map new field
                district: store.attributes.district, // Map new field
                items: store.attributes.items.data.map((item: any) => ({
                    id: item.id,
                    name: item.attributes.name,
                    description: item.attributes.description,
                    price: item.attributes.price,
                    imageUrl: item.attributes.imageUrl,
                    // Add other fields as necessary
                })),
                // Add other fields as necessary
            }));
            return stores;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to load stores');
        }
    }
);

// Store slice
const storeSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStores.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStores.fulfilled, (state, action) => {
                state.loading = false;
                state.stores = action.payload;
            })
            .addCase(fetchStores.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setFilters } = storeSlice.actions;
export default storeSlice.reducer;
