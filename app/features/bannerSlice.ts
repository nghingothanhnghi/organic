import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { BannerState } from '~/types/banner';
import { fetchBannersAPI } from '~/services/bannerService';
import { DEFAULT_CUSTOMER_ID } from '~/constants/apiConstants';

// Initial state
const initialState: BannerState = {
    banners: [],
    loading: false,
    error: null,
  };
  
// **Thunk to fetch banners**
export const fetchBanners = createAsyncThunk(
    'banners/fetchBanners',
    async (customerId: string = DEFAULT_CUSTOMER_ID, { rejectWithValue }) => {
      try {
        return await fetchBannersAPI(customerId);
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );
  
  // **Create the slice**
  const bannerSlice = createSlice({
    name: 'banners',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBanners.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBanners.fulfilled, (state, action) => {
          state.banners = action.payload;
          state.loading = false;
        })
        .addCase(fetchBanners.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  // **Export the async thunk and reducer**
  export default bannerSlice.reducer;