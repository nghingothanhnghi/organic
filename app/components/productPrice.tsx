// app/components/ProductPrice.tsx
import React from 'react';
import { formatPrice } from '~/utils/formatPrice';

import type { ProductPriceProps } from '~/types/product';

const ProductPrice: React.FC<ProductPriceProps> = ({ product, className }) => {
  const { price, discountPrice } = product;
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
