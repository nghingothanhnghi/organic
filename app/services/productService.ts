// Example of using the default api instance
import axiosPrivate from '~/api/axios';

// Service function to fetch products from the API
export const fetchProductsAPI = async (page: number, pageSize: number) => {
  const params = new URLSearchParams({
    'populate': 'deep',
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
  });
  const response = await axiosPrivate.get(`/products?${params.toString()}`);
  return response.data; // Assuming the API returns the product data
};
