// app/features/contentSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchContentAPI } from '~/services/contentService';
import type { SectionState, Section } from '~/types/section';
import type { PaginationMeta } from '~/types/pagination';

// Initial state
const initialState: SectionState = {
    sections: [],
    loading: false,
    error: null,
    pagination: null, // Initialize meta as null
    filters: {},
};

export const fetchContent = createAsyncThunk<
    { sections: Section[]; pagination: PaginationMeta },
    { page: number; pageSize: number; filters?: Record<string, any> }, // Arguments for pagination
    { rejectValue: string }
>(
    'sections/fetchContents', // Action name
    async ({ page, pageSize, filters = {} }, { rejectWithValue }) => {
        try {
            const response = await fetchContentAPI(page, pageSize, filters); // Call the service function
            // Extract and flatten the data from the response
            const sections: Section[] = response.data.map((section: any) => ({
                id: section.id,
                heading: section.attributes.heading,
                createdAt: section.attributes.createdAt,
                updatedAt: section.attributes.updatedAt,
                links: section.attributes.links,
            }));

            const pagination: PaginationMeta = response.meta.pagination; // Extract pagination data
            return { sections, pagination }; // Return both sections and meta
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to load sections');
        }
    }
);

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        // Example: Filter sections
        setFilters(state, action) {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContent.fulfilled, (state, action) => {
                state.loading = false;
                state.sections = action.payload.sections; // Adjust based on your API response
                state.pagination = action.payload.pagination || null;
            })
            .addCase(fetchContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setFilters } = contentSlice.actions;

export default contentSlice.reducer;
