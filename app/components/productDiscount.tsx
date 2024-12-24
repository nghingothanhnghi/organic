// app/components/ProductDiscount.tsx
import React from 'react';
import type { Product } from '~/types/product'; // Import the Product type
import { calculateDiscount } from '~/utils/calculate';

interface ProductDiscountProps {
    product: Product; // Expect the whole product object
}

const ProductDiscount: React.FC<ProductDiscountProps> = ({ product }) => {
    const { price, discount, discountPrice } = product;

    if (!discount || !discountPrice) return null; // If no discount, return null

    // Calculate the discount percentage using the utility function
    const discountPercentage = calculateDiscount(price, discountPrice);

    return (

        <span className="absolute -right-px -top-px rounded-bl-2lg rounded-tr-2lg bg-rose-600 px-2 py-2 text-xs font-medium uppercase tracking-widest text-white">
            -{discountPercentage}% Off
        </span>
    );
};

export default ProductDiscount;
