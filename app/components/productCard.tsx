// app/components/ProductCard.tsx
import React from 'react';
import ProductThumb from './productThumb';
import ProductPrice from './productPrice'; 
import AddToCartButton from "./addToCartButton";
import type { Product } from '~/types/product';
import { formatPrice } from '~/utils/formatPrice';

interface ProductCardProps {
    product: Product; // Expect the whole product object
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, price, discountPrice } = product;
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
            {/* Image Section */}
            <div className="relative w-full h-56 bg-gray-200">
                <ProductThumb product={product} className="object-cover w-full h-full" width={400} height={400} />
            </div>
            {/* Content Section */}
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
                {/* Price */}
                <ProductPrice price={price} discountPrice={discountPrice} />
                {/* Add to Cart Button */}
                <div className="mt-4">
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;