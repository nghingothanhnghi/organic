// app/features/articleSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchArticlesAPI, fetchArticleBySlugAPI } from '~/services/articleService';
import type { ArticleState, Article } from '~/types/article';
import type { PaginationMeta } from '~/types/pagination';

// Initial state
const initialState: ArticleState = {
  articles: [],
  article: null,
  loading: false,
  error: null,
  pagination: null, // Initialize meta as null
  filters: {},
};

// Async thunk to fetch articles from the API
export const fetchArticles = createAsyncThunk<
  { articles: Article[]; pagination: PaginationMeta },
  { page: number; pageSize: number; filters?: Record<string, any> }, // Arguments for pagination
  { rejectValue: string }
>(
  'articles/fetchArticles', // Action name
  async ({ page, pageSize, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await fetchArticlesAPI(page, pageSize, filters); // Call the service function
      // Extract and flatten the data from the response
      const articles: Article[] = response.data.map((post: any) => ({
        id: post.id,
        title: post.attributes.title,
        description: post.attributes.description,
        imageUrl: post.attributes.imageUrl,
        media: post.attributes.media?.data?.map((img: any) => ({
          id: img.id,
          attributes: {
            name: img.attributes.name,
            url: img.attributes.url,
            formats: img.attributes.formats,
          },
        })) ?? [],
        createdAt: post.attributes.createdAt,
        updatedAt: post.attributes.updatedAt,
        publishedAt: post.attributes.publishedAt,
        slug: post.attributes.slug ?? null,
      }));

      const pagination: PaginationMeta = response.meta.pagination; // Extract pagination data
      return { articles, pagination }; // Return both articles and meta
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load articles');
    }
  }
);

// ✅ Async thunk to fetch a single article by slug
export const fetchArticleBySlug = createAsyncThunk<
  Article,
  string,
  { rejectValue: string }
>(
  'articles/fetchArticleBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetchArticleBySlugAPI(slug);
      if (!response) {
        return rejectWithValue('Article not found');
      }

      const article: Article = {
        id: response.id,
        title: response.attributes.title,
        description: response.attributes.description,
        imageUrl: response.attributes.imageUrl,
        media: response.attributes.media?.data?.map((img: any) => ({
          id: img.id,
          attributes: {
            name: img.attributes.name,
            url: img.attributes.url,
            formats: img.attributes.formats,
          },
        })) ?? [],
        createdAt: response.attributes.createdAt,
        updatedAt: response.attributes.updatedAt,
        publishedAt: response.attributes.publishedAt,
        slug: response.attributes.slug ?? null,
      };

      return article;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load article');
    }
  }
);


// Product slice
const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    // You can add any local reducer logic if necessary
    setFilters: (state, action) => {
      state.filters = action.payload; // Update filters with the payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true; // Set loading to true when the request starts
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request succeeds
        state.articles = action.payload.articles; // Store the fetched articles
        state.pagination = action.payload.pagination; // Store pagination meta data
        console.log('Fetched articles:', action.payload.articles);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload as string; // Store the error message
        toast.error(action.payload || 'Failed to load articles');
      })
      // ✅ Handle fetchArticleBySlug
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true;
        state.article = null; // Clear previous article
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload || 'Failed to load article');
      });
  },
});

export const { setFilters } = articleSlice.actions; // Export the setFilters action

export default articleSlice.reducer;
