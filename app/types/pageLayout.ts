import type { User } from "./user";
import type { PaginationMeta } from "./pagination";
export interface PageLayout {
    id: number;
    label: string;
    slug: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    blocks: PageBlock[];
    users_permissions_user: User | null;
    seo: SEO | null;
}

export interface PageLayoutState {
    pages: PageLayout[];
    loading: boolean;
    error: string | null;
    pagination: PaginationMeta | null;
    filters: Record<string, any>;
}

export interface PageBlock {
    id: number;
    __component: string;
    bannerTitle?: string;
    bannerUrl?: string | null;
    bannerDecription?: string;
    bannerImageURI?: string | null;
    featuredName?: string;
    FeaturedImageByUrl?: string | null;
    featuredSubName?: string | null;
}

export interface SEO {
    id: number;
    metaTitle: string | null;
    metaDescription: string | null;
    preventIndex: boolean;
    structuredData: string | null;
}

export interface Localizations {
    data: any[];
}
