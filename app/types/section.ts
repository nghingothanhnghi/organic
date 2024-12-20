// app/types/section.ts
import type { PaginationMeta } from "./pagination";

export interface Link {
  id: number;
  name: string;
  url: string | null;
  description: string | null;
  media: {
      data: any | null; // Adjust this if you have a specific structure for media data
  };
}

export interface SectionAttributes {
  heading: string;
  createdAt: string;
  updatedAt: string;
  links: Link[]; // Array of links associated with the section
}

export interface Section {
  id: number;
  heading: string;
  createdAt: string;
  updatedAt: string;
  links: Link[];
}

// Redux state interface
export interface SectionState {
  sections: Section[]; // Array of sections
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
  filters: Record<string, any>;
}