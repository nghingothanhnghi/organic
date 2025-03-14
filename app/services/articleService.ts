// app/services/articleService.ts
import { axiosPrivate } from "~/api/axios";

// Service function to fetch products from the API
export const fetchArticlesAPI = async (
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
    const value = filters[key];
    if (value === null) {
      params.append(`filters[${key}][$null]`, "true");
    } else if (value !== undefined) { // Ignore undefined values
      if (Array.isArray(value)) {
        value.forEach((v: any) => {
          params.append(`filters[${key}][$in]`, v.toString());
        });
      } else {
        const isString = typeof value === "string";
        const operator = isString ? "$contains" : "$eq";
        params.append(`filters[${key}][${operator}]`, value.toString());
      }
    }
  });
  
  const response = await axiosPrivate.get(`/posts?${params.toString()}`);
  console.log("📦 Order API Response:", response.data);
  return response.data; // Assuming the API returns the product data
};
