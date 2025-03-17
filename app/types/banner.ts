// types/banner.ts
// Define a Banner type
export interface Banner {
    id: number;
    attributes: {
      title?: string;
      imageUrl?: string;
      [key: string]: any; // Extendable attributes
    };
  }

  // Define BannerState type
export interface BannerState {
    banners: Banner[];
    loading: boolean;
    error: string | null;
  }