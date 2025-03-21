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
  console.log("📦 Articles API Response:", response.data);
  return response.data; // Assuming the API returns the product data
};


// ✅ Fetch single article by Slug (NEW FUNCTION)
export const fetchArticleBySlugAPI = async (slug: string) => {
  const response = await axiosPrivate.get(
    `/posts?filters[slug][$eq]=${slug}&populate=deep`
  );
  console.log("📝 Article Detail by Slug API Response:", response.data);
  return response.data?.data?.[0] || null; // Return first article matching slug
};
