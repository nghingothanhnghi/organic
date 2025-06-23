// app/services/bannerService.ts
import { axiosPrivate } from "~/api/axios";
import type { Banner } from "~/types/banner";

export const fetchBannersAPI = async (customerId: string): Promise<Banner[]> => {
  try {
    const filterQuery = `filters[$and][0][users_permissions_user][username][$eq]=${customerId}`;
    const response = await axiosPrivate.get(`/banners?populate=*&${filterQuery}`);

    // Handle 204 No Content
    if (response.status === 204 || !response.data || !response.data.data) {
      return []; // Return an empty array instead of throwing an error
    }

    return response.data.data.map((banner: any) => ({
      id: banner.id,
      attributes: banner.attributes,
    })) || [];

  } catch (error) {
    console.error("Error fetching banners:", error);
    return []; // Return empty array on failure
  }
};

 