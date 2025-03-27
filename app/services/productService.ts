// app/services/productService.ts
import { axiosPrivate } from "~/api/axios";
import { DEFAULT_CUSTOMER_ID } from "~/constants/apiConstants";

// Service function to fetch products from the API
export const fetchProductsAPI = async (
  page: number,
  pageSize: number,
  filters: Record<string, any> = {},
  customerId: string = DEFAULT_CUSTOMER_ID
) => {
  const params = new URLSearchParams({
    'populate': 'deep',
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
  });

  // Convert filters into query parameters (only if they have values)
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value.trim() !== "") { // <-- Check if value is not empty
      params.append(`filters[${key}][$contains]`, value.toString());
    }
  });

  // Add customer filter
  params.append('filters[$and][0][users_permissions_user][username][$eq]', customerId);

  // Decode and log the request URL and parameters in a cleaner format
  const requestUrl = `/products?${params.toString()}`;
  console.log("Fetching products with request:", {
    url: decodeURIComponent(requestUrl), // Decoded for readability
    filters,  // Displaying filters object separately
    pagination: { page, pageSize }
  });

  const response = await axiosPrivate.get(requestUrl);
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