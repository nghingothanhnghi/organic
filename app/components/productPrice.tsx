// app/components/ProductPrice.tsx
import React from 'react';
import { formatPrice } from '~/utils/formatPrice';

import type { ProductPriceProps } from '~/types/product';

const ProductPrice: React.FC<ProductPriceProps> = ({ product, className, variant }) => {
  // const { price, discountPrice } = variant || product;
  // Check if product or variant is null/undefined before trying to access their properties
  if (!product) {
    return null; // Optionally, return a fallback message or element if product is missing
  }
  // Use the variant's price if available, otherwise fallback to the product's price
  // Ensure variant is also valid before accessing its properties
  const price = (variant && variant.price) ?? product.price ?? 0; // Fallback to 0 if price is missing
  const discountPrice = product.discountPrice; // Only the product has discountPrice

  // Do not render the price if it is 0
  if (price === 0) {
    return null; // Or you can return <span>Price not available</span> if you want to show a message
  }

  return (
    <div className={`mt-3 ${className || ''}`}>
      {discountPrice ? (
        // If there's a discount, display original price with a strikethrough and the discount price
        <div className='flex flex-col'>
          <span className="line-through text-gray-400">{formatPrice(price)}</span>
          <span className="text-lime-700">{formatPrice(discountPrice)}</span>
        </div>
      ) : (
        // If there's no discount, simply display the original price in the discount color
        <span className="text-lime-700">{formatPrice(price)}</span>
      )}
    </div>
  );
};

export default ProductPrice;
