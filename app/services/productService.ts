// app/services/productService.ts
import { axiosPrivate } from "~/api/axios";

// Service function to fetch products from the API
export const fetchProductsAPI = async (
  page: number,
  pageSize: number,
  filters: Record<string, any> = {}
) => {
  const params = new URLSearchParams({
    'populate': 'deep',
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
  });
  // Convert filters into query parameters
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      params.append(`filters[${key}][$contains]`, filters[key].toString());
    }
  });
  const response = await axiosPrivate.get(`/products?${params.toString()}`);
  return response.data; // Assuming the API returns the product data
};


// Service function to fetch a single product by slug
export const fetchProductBySlugAPI = async (slug: string) => {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug, // Filter products where the slug matches
    'populate': 'deep', // Include related entities
  });
  const response = await axiosPrivate.get(`/products?${params.toString()}`);
  
  if (response.data.data.length === 0) {
    throw new Error('Product not found'); // Handle case where no product matches the slug
  }

  return response.data.data[0]; // Return the first matching product
};