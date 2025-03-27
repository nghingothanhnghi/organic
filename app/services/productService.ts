// app/services/productService.ts
import { axiosPrivate } from "~/api/axios";
import { DEFAULT_CUSTOMER_ID } from "~/constants/apiConstants";

// Define a proper type for filters
type Filters = Record<string, string>;

// Service function to fetch products from the API
export const fetchProductsAPI = async (
  page: number,
  pageSize: number,
  // filters: Record<string, any> = {},
  filters: Filters = {},
  customerId: string = DEFAULT_CUSTOMER_ID
) => {
  const params = new URLSearchParams({
    'populate': 'deep',
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
  });

   // Build the `$and` array for filters
  const andFilters: Record<string, any>[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === "string" && value.trim() !== "") {
      if (key === "categories") {
        andFilters.push({ categories: { name: { $eq: value } } });
      } else {
        andFilters.push({ [key]: { $contains: value } });
      }
    }
  });

  andFilters.push({ users_permissions_user: { username: { $eq: customerId } } });

  // Add `$and` filters safely
  if (andFilters.length > 0) {
    andFilters.forEach((filter, index) => {
      Object.entries(filter).forEach(([key, condition]) => {
        if (typeof condition === "object" && condition !== null) {
          Object.entries(condition).forEach(([subKey, subValue]) => {
            if (typeof subValue === "object" && subValue !== null) {
              Object.entries(subValue).forEach(([operator, value]) => {
                params.append(
                  `filters[$and][${index}][${key}][${subKey}][${operator}]`,
                  String(value)
                );
              });
            }
          });
        }
      });
    });
  }


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