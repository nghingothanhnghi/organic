// app/features/storeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStoresAPI } from '~/services/storeService';

interface StoreState {
    stores: any[];
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
    any[],
    Record<string, any>,
    { rejectValue: string }
>(
    'stores/fetchStores',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await fetchStoresAPI(filters);
            return response.data;
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
