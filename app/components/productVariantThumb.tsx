import React from 'react';
import { getImageUrl } from '~/utils/getImageUrl'; // Utility for fetching image URLs
import EmptyImageIcon from '~/assets/photos-empty.png'; // Fallback image
import { useTranslation } from 'react-i18next'; // For translations
import type { ProductVariant } from '~/types/product'; // Import ProductVariant type

interface ProductVariantThumbProps {
  variant: ProductVariant; // Expect a ProductVariant object
  className?: string; // Optional class name for styling
  width?: number; // Optional width for the image
  height?: number; // Optional height for the image
  format?: 'thumbnail' | 'small'; // Desired image format
}

const ProductVariantThumb: React.FC<ProductVariantThumbProps> = ({
  variant,
  className = "variant-image img-fluid",
  width,
  height,
  format = 'small', // Default to 'small'
}) => {
  const { t } = useTranslation();

  // Determine the image URL or fallback to the EmptyImageIcon
  const imageUrl = variant.media
    ? getImageUrl(variant.media, format) // Use the utility to get the formatted image URL
    : EmptyImageIcon;

  return (
    <img
      src={imageUrl}
      alt={variant.name || t('variant.altText', { name: t('defaultName', 'Unnamed Variant') })}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default ProductVariantThumb;
