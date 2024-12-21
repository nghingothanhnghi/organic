// app/features/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchProductsAPI } from '~/services/productService';
import type { ProductState, Product} from '~/types/product';
import type { PaginationMeta } from '~/types/pagination';

// Initial state
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  pagination: null, // Initialize meta as null
  filters: {},
};

// Async thunk to fetch products from the API
export const fetchProducts = createAsyncThunk<
  { products: Product[]; pagination: PaginationMeta },
  { page: number; pageSize: number; filters?: Record<string, any> }, // Arguments for pagination
  { rejectValue: string }
>(
  'products/fetchProducts', // Action name
  async ({ page, pageSize, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await fetchProductsAPI(page, pageSize, filters); // Call the service function
      // Extract and flatten the data from the response
      const products: Product[] = response.data.map((product: any) => ({
        id: product.id,
        name: product.attributes.name,
        description: product.attributes.description,
        imageUrl: product.attributes.imageUrl,
        productImg: product.attributes.productImg?.data?.map((img: any) => ({
          id: img.id,
          attributes: {
            name: img.attributes.name,
            url: img.attributes.url,
            formats: img.attributes.formats,
          },
        })) ?? [], // Fallback to empty array if productImg or productImg.data is null or undefined
        price: product.attributes.price ?? 0, // Fallback to 0 if price is null or undefined
        quantity: product.attributes.quantity ?? 0, // Fallback to 0
        bestseller: product.attributes.bestseller ?? false,
        discountPrice: product.attributes.discountPrice ?? 0,
        featured: product.attributes.featured ?? false,
        productSku: product.attributes.productSku ?? '',
        availableStartDate: product.attributes.availableStartDate ?? null,
        availableEndDate: product.attributes.availableEndDate ?? null,
        store: product.attributes.store ?? null, // Assuming nested store data
        categories: product.attributes.categories ?? [], // Assuming nested category data
        brand: product.attributes.brand ?? null, // Assuming nested brand data
        createdAt: product.attributes.createdAt,
        updatedAt: product.attributes.updatedAt,
        publishedAt: product.attributes.publishedAt,
        slug: product.attributes.slug ?? null,
        ratings: product.attributes.ratings?.data ?? [],
        crossSellProducts: product.attributes.crossSellProducts?.data?.map((crossSell: any) => ({
          id: crossSell.id,
          name: crossSell.attributes.name,
          description: crossSell.attributes.description,
          price: crossSell.attributes.price,
          imageUrl: crossSell.attributes.imageUrl,
          published: crossSell.attributes.published,
          createdAt: crossSell.attributes.createdAt,
          updatedAt: crossSell.attributes.updatedAt,
          slug: crossSell.attributes.slug,
        })) ?? []
      }));

      const pagination: PaginationMeta = response.meta.pagination; // Extract pagination data
      return { products, pagination }; // Return both products and meta
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load products');
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // You can add any local reducer logic if necessary
    setFilters: (state, action) => {
      state.filters = action.payload; // Update filters with the payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Set loading to true when the request starts
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request succeeds
        state.products = action.payload.products; // Store the fetched products
        state.pagination = action.payload.pagination; // Store pagination meta data
        console.log('Fetched products:', action.payload.products);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload as string; // Store the error message
        toast.error(action.payload || 'Failed to load products');
      });
  },
});

export const { setFilters } = productSlice.actions; // Export the setFilters action

export default productSlice.reducer;
