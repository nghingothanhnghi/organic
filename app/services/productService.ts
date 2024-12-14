// Example of using the default api instance
import axiosPrivate from '~/api/axios';

// Service function to fetch products from the API
export const fetchProductsAPI = async () => {
    const response = await axiosPrivate.get('/products');
    return response.data; // Assuming the API returns the product data
  };
