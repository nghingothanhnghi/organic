// app/features/reviewSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductReviews, submitProductReview } from '../services/reviewService';
import type { ReviewState } from '~/types/review';

// Initial state
const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
  success: null,
};

// Fetch reviews for a product
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ productId, page, pageSize }: { productId: number; page: number; pageSize: number }) => {
    const reviews = await getProductReviews(productId, page, pageSize);
    return reviews;
  }
);

// Submit a new review
export const submitReview = createAsyncThunk(
  'reviews/submitReview',
  async ({ productId, reviewData }: { productId: number; reviewData: { score: number; reviewText: string } }) => {
    const review = await submitProductReview(productId, reviewData);
    return review;
  }
);


// Create the slice
const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchReviews actions
    builder.addCase(fetchReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.error = null;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to load reviews';
    });

    // Handle submitReview actions
    builder.addCase(submitReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitReview.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews.push(action.payload); // Add the new review to the reviews list
      state.error = null;
    });
    builder.addCase(submitReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to submit review';
    });
  },
});

export default reviewSlice.reducer;
