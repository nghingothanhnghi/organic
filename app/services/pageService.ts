// app/services/pageService.ts
import { axiosPrivate } from "~/api/axios";

// Service function to fetch page-layouts from the API with dynamic filters
export const fetchPagesAPI = async (
    page: number,
    pageSize: number,
    filters: Record<string, any> = {}
  ) => {
    const params = new URLSearchParams({
      "populate": "deep",
      "pagination[page]": page.toString(),
      "pagination[pageSize]": pageSize.toString(),
    });
  
    // Handle dynamic filters (e.g., filter by username)
    if (filters.username) {
      params.append(
        "filters[$and][0][users_permissions_user][username][$eq]",
        filters.username
      );
    }
  
    // Handle other dynamic filters
    Object.keys(filters).forEach((key) => {
      if (key !== "username" && filters[key]) {
        params.append(`filters[${key}][$contains]`, filters[key].toString());
      }
    });
  
    try {
      const response = await axiosPrivate.get(`/page-layouts?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch pages");
    }
  };
