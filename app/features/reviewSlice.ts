// app/features/reviewSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductReviews, submitProductReview } from '../services/reviewService';
import type { ReviewState } from '~/types/review';
import { toast } from 'react-toastify';

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
  async (reviewData: { productId: number; score: number; reviewText: string; userId: number }, { rejectWithValue }) => {
    try {
      const review = await submitProductReview(reviewData.productId, reviewData);
      return review;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error.message);
      }
      return rejectWithValue(error.message || 'Failed to submit review');
    }
  }
);


// Create the slice
const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.success = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchReviews actions
    builder.addCase(fetchReviews.pending, (state) => {
      state.loading = true;
      toast.info('Loading reviews...');
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
      state.success = 'Review submitted successfully';
      state.error = null;
    });
    builder.addCase(submitReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(state.error); 
    });
  },
});

export const { clearSuccess, clearError } = reviewSlice.actions;

export default reviewSlice.reducer;
