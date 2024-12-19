import { IMAGE_API } from "~/constants/apiConstants";
import type { ProductImage } from "~/types/product";

type Format = 'thumbnail' | 'small';  // Define valid format types

export const getImageUrl = (
  media: ProductImage | null,  // Updated type to ProductImage or null
  format: Format = 'small',  // Use 'Format' type here
  baseUrl = IMAGE_API
): string => {
  // If no media is provided, return a default avatar image URL
  if (!media) {
    return getDefaultAvatarUrl();
  }

  // Ensure media has attributes and formats
  const { attributes } = media;
  if (!attributes || !attributes.formats) {
    return getDefaultAvatarUrl();  // Return default if no formats found
  }

  const { formats } = attributes;

  // Log formats to see what is available
  // (You may want to remove this in production)
  console.log("Available formats:", formats);

  // Check if the requested format exists
  if (formats[format]) {
    return baseUrl + formats[format].url;
  } else {
    // If the requested format doesn't exist, fall back to a default or another format
    console.warn(`Format '${format}' not found. Falling back to 'small' format.`);
    return formats['small'] ? baseUrl + formats['small'].url : getDefaultAvatarUrl();
  }
};

// Helper function to return the default avatar URL
const getDefaultAvatarUrl = (): string => {
  return 'https://gravatar.com/avatar/1425bc5c8115243ef4f5a9486e71e7fc?s=400&d=identicon&r=x';
};
