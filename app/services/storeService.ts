import { axiosPrivate } from "~/api/axios";
import { DEFAULT_CUSTOMER_ID } from "~/constants/apiConstants";

export const fetchStoresAPI = async (filters: Record<string, any>) => {
    const response = await axiosPrivate.get('/stores', {
        params: {
            populate: '*',
            filters: {
                $and: [
                    { customerId: { $eq: DEFAULT_CUSTOMER_ID } },
                    ...Object.entries(filters).map(([key, value]) => ({
                        [key]: { $eq: value }
                    }))
                ]
            }
        }
    });
    return response.data;
};