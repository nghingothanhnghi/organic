// types/banner.ts
// Define a Banner type
export interface Banner {
    id: number;
    bannerTitle?: string;
    bannerUrl?: string;
    bannerDescription?: string;
    bannerImageURI?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  // Define BannerState type
export interface BannerState {
    banners: Banner[];
    loading: boolean;
    error: string | null;
  }