import React from 'react';
import { getImageUrl } from '~/utils/getImageUrl'; // Import the getImageUrl function
import EmptyImageIcon from '~/assets/photos-empty.png'; // Default image if no valid image is found
import { useTranslation } from 'react-i18next'; // Import for i18n support if needed
import type { Product, ProductImage } from '~/types/product'; // Import Product and ProductImage types

interface ProductThumbProps {
  product: Product | null; // Expect the full product object
  className?: string; // Optional class name for styling
  width?: number; // Optional width for the image
  height?: number; // Optional height for the image
}

const ProductThumb: React.FC<ProductThumbProps> = ({ product, className = "mb-3 img-fluid", width, height }) => {
  const { t } = useTranslation();

  // // Check if productImg exists and is an array of images
  // const productImg: ProductImage | null = product.productImg?.length > 0
  //   ? product.productImg[0] // Use the first image from productImg array
  //   : null;

  // // If productImg exists, try to get the URL for the small format
  // const imageUrl = productImg
  //   ? getImageUrl(productImg, 'small') // Pass the ProductImage object to get the small format image URL
  //   : (product.imageUrl && product.imageUrl.trim() !== "" ? product.imageUrl : EmptyImageIcon);

   // Handle the case where product is null
   if (!product) {
    return (
      <img
        src={EmptyImageIcon} // Use the default image
        alt={t('product.noProduct')} // Fallback alt text for missing product
        className={className}
        width={width}
        height={height}
      />
    );
  }

  // Check if productImg exists and is an array of images
  const productImg: ProductImage | null =
    product.productImg?.length > 0 ? product.productImg[0] : null;

  // If productImg exists, try to get the URL for the small format
  const imageUrl = productImg
    ? getImageUrl(productImg, 'small') // Pass the ProductImage object to get the small format image URL
    : product.imageUrl && product.imageUrl.trim() !== ''
    ? product.imageUrl
    : EmptyImageIcon;

  return (
    <img
      src={imageUrl}
      alt={product.name}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default ProductThumb;
