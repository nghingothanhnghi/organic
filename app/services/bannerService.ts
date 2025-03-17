// app/services/bannerService.ts
import { axiosPrivate } from "~/api/axios";
import type { Banner } from "~/types/banner";

export const fetchBannersAPI = async (customerId: string): Promise<Banner[]> => {
    const filterQuery = `filters[$and][0][users_permissions_user][username][$eq]=${customerId}`;
    const response = await axiosPrivate.get(`/banners?populate=*&${filterQuery}`);
    return response.data.data.map((banner: any) => ({
      id: banner.id,
      attributes: banner.attributes,
    })) || [];
  };

 