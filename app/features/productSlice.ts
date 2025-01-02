// app/features/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchProductsAPI, fetchProductBySlugAPI } from '~/services/productService';
import type { ProductState, Product } from '~/types/product';
import type { PaginationMeta } from '~/types/pagination';

// Initial state
const initialState: ProductState = {
  products: [],
  product: null,
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
        discount: product.attributes.discount ?? false,
        discountPrice: product.attributes.discount_price ?? 0,
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
        })) ?? [],
        variants: product.attributes.variants?.data?.map((variant: any) => ({
          id: variant.id,
          name: variant.attributes.name,
          price: variant.attributes.price,
          discountPrice: variant.attributes.discountPrice,
          stock: variant.attributes.stock,
          image: product.attributes.image,
          media: variant.attributes.media?.data?.[0] ? { // Flatten to a single image (assuming the first image is the desired one)
            id: variant.attributes.media.data[0].id,
            attributes: {
              name: variant.attributes.media.data[0].attributes.name,
              url: variant.attributes.media.data[0].attributes.url,
              formats: variant.attributes.media.data[0].attributes.formats,
            },
          } : null, // If there's no media, set it to null
          published: variant.attributes.published,
          createdAt: variant.attributes.createdAt,
          updatedAt: variant.attributes.updatedAt,
          slug: variant.attributes.slug,
          isDefault: variant.attributes.isDefault
        })) ?? [],
      }));

      const pagination: PaginationMeta = response.meta.pagination; // Extract pagination data
      return { products, pagination }; // Return both products and meta
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load products');
    }
  }
);

// Async thunk to fetch a product by slug
export const fetchProductBySlug = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  'products/fetchProductBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetchProductBySlugAPI(slug);
      const product: Product = {
        id: response.id,
        name: response.attributes.name,
        description: response.attributes.description,
        imageUrl: response.attributes.imageUrl,
        productImg: response.attributes.productImg?.data?.map((img: any) => ({
          id: img.id,
          attributes: {
            name: img.attributes.name,
            url: img.attributes.url,
            formats: img.attributes.formats,
          },
        })) ?? [], // Fallback to empty array if productImg or productImg.data is null or undefined
        price: response.attributes.price ?? 0, // Fallback to 0 if price is null or undefined
        quantity: response.attributes.quantity ?? 0, // Fallback to 0
        bestseller: response.attributes.bestseller ?? false,
        discount: response.attributes.discount ?? false,
        discountPrice: response.attributes.discount_price ?? 0,
        featured: response.attributes.featured ?? false,
        productSku: response.attributes.productSku ?? '',
        availableStartDate: response.attributes.availableStartDate ?? null,
        availableEndDate: response.attributes.availableEndDate ?? null,
        store: response.attributes.store ?? null, // Assuming nested store data
        categories: response.attributes.categories ?? [], // Assuming nested category data
        brand: response.attributes.brand ?? null, // Assuming nested brand data
        createdAt: response.attributes.createdAt,
        updatedAt: response.attributes.updatedAt,
        publishedAt: response.attributes.publishedAt,
        slug: response.attributes.slug ?? null,
        ratings: response.attributes.ratings?.data ?? [],
        crossSellProducts: response.attributes.crossSellProducts?.data?.map((crossSell: any) => ({
          id: crossSell.id,
          name: crossSell.attributes.name,
          description: crossSell.attributes.description,
          price: crossSell.attributes.price,
          imageUrl: crossSell.attributes.imageUrl,
          published: crossSell.attributes.published,
          createdAt: crossSell.attributes.createdAt,
          updatedAt: crossSell.attributes.updatedAt,
          slug: crossSell.attributes.slug,
        })) ?? [],
        variants: response.attributes.variants?.data?.map((variant: any) => ({
          id: variant.id,
          name: variant.attributes.name,
          price: variant.attributes.price,
          discountPrice: variant.attributes.discountPrice,
          stock: variant.attributes.stock,
          image: response.attributes.image,
          media: variant.attributes.media?.data?.[0] ? { // Flatten to a single image (assuming the first image is the desired one)
            id: variant.attributes.media.data[0].id,
            attributes: {
              name: variant.attributes.media.data[0].attributes.name,
              url: variant.attributes.media.data[0].attributes.url,
              formats: variant.attributes.media.data[0].attributes.formats,
            },
          } : null, // If there's no media, set it to null
          published: variant.attributes.published,
          createdAt: variant.attributes.createdAt,
          updatedAt: variant.attributes.updatedAt,
          slug: variant.attributes.slug,
          isDefault: variant.attributes.isDefault
        })) ?? [],
      };
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product details');
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
      })
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload || 'Failed to fetch product');
      });
  },
});

export const { setFilters } = productSlice.actions; // Export the setFilters action

export default productSlice.reducer;
