// app/components/ProductPrice.tsx
import React from 'react';
import { formatPrice } from '~/utils/formatPrice';

import type { ProductPriceProps } from '~/types/product';

const ProductPrice: React.FC<ProductPriceProps> = ({ product, className, variant }) => {
  // const { price, discountPrice } = variant || product;

    // Use the variant's price if available, otherwise fallback to the product's price
    const price = variant?.price ?? product.price ?? 0; // Ensure a default value for price
    const discountPrice = product.discountPrice; // Only the product has discountPrice
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
