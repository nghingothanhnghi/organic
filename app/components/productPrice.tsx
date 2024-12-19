// app/components/ProductPrice.tsx
import React from 'react';
import { formatPrice } from '~/utils/formatPrice';

interface ProductPriceProps {
  price: number;
  discountPrice?: number;  // Optional, for discounted price
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, discountPrice }) => {
  return (
    <p className="mt-3 text-lg font-semibold text-gray-800">
      {discountPrice ? (
        <>
          <span className="line-through text-red-500">{formatPrice(price)}</span>
          <span className="text-lime-700 ml-2">{formatPrice(discountPrice)}</span>
        </>
      ) : (
        <span className="text-lime-700">{formatPrice(price)}</span>
      )}
    </p>
  );
};

export default ProductPrice;
