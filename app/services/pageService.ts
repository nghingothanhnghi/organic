// app/services/pageService.ts
import { axiosPrivate } from "~/api/axios";

// Service function to fetch page-layouts from the API
export const fetchPagesAPI = async (
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
  const response = await axiosPrivate.get(`/page-layouts?${params.toString()}`);
  return response.data; // Assuming the API returns the page-layouts data
};