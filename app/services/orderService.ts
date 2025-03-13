// app/services/orderService.ts
import { axiosPrivate } from "~/api/axios";

// Service function to fetch products from the API
export const fetchOrdersAPI = async (
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
      if (key === 'purchaseOrder') {
        // Use $eq for purchaseOrder
        params.append(`filters[${key}][$eq]`, filters[key].toString());
      } else {
        // Use $contains for other filters
        params.append(`filters[${key}][$contains]`, filters[key].toString());
      }
    }
  });

  const response = await axiosPrivate.get(`/orders?${params.toString()}`);
  console.log("📦 Order API Response:", response.data);
  return response.data; // Assuming the API returns the product data
};


export const createOrderAPI = async (orderData: Record<string, any>) => {
  try {
    const response = await axiosPrivate.post('/orders', {
      data: orderData,
    });
    return response.data; // Assuming the API returns the created order data
  } catch (error: any) {
    // Handle and rethrow errors
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to create order.');
    }
    throw error;
  }
};
