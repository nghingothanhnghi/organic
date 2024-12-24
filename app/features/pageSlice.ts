// app/features/pageSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchPagesAPI } from "~/services/pageService";
import type { PaginationMeta } from "~/types/pagination";
import type { PageLayout, PageLayoutState } from "~/types/pageLayout";

// Initial state
const initialState: PageLayoutState = {
    pages: [],
    loading: false,
    error: null,
    pagination: null,
    filters: {},
};

// Async thunk to fetch pages
export const fetchPages = createAsyncThunk<
    { pages: PageLayout[]; pagination: PaginationMeta },
    { page: number; pageSize: number; filters?: Record<string, any> }, // Arguments for pagination
    { rejectValue: string }
>(
    'pages/fetchPages', // Action name
    async ({ page, pageSize, filters = {} }, { rejectWithValue }) => {
        try {
            const response = await fetchPagesAPI(page, pageSize, filters);
            // Flatten and format the response
            const pages: PageLayout[] = response.data.map((page: any) => ({
                id: page.id,
                label: page.attributes.label,
                slug: page.attributes.slug,
                createdAt: page.attributes.createdAt,
                updatedAt: page.attributes.updatedAt,
                publishedAt: page.attributes.publishedAt,
                locale: page.attributes.locale,
                blocks: page.attributes.blocks || [],
                users_permissions_user: page.attributes.users_permissions_user?.data || null,
                seo: page.attributes.seo || null,
            }));

            const pagination: PaginationMeta = response.meta.pagination; // Extract pagination data
            return { pages, pagination }; // Return both pages and meta
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch pages");
        }
    }
);

// Slice
const pageSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPages.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.pages = action.payload.pages; // Flattened and formatted pages
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchPages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = pageSlice.actions;
export default pageSlice.reducer;
