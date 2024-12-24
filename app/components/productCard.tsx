// app/components/ProductCard.tsx
import React from 'react';
import ProductThumb from './productThumb';
import ProductPrice from './productPrice';
import ProductDiscount from './productDiscount';
import AddToCartButton from "./addToCartButton";
import type { ProductCardProps } from '~/types/product';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name } = product;
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl group">
            {/* Image Section */}
            <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
                <ProductThumb product={product} className="object-cover w-full h-full" width={400} height={400} />
                {/* Add to Cart Button */}
                <div className="mt-4 absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <AddToCartButton product={product} className=' rounded-none' />
                </div>
                {/* Discount Badge */}
                <ProductDiscount product={product}/>
            </div>
            {/* Content Section */}
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
                {/* Price */}
                <ProductPrice product={product} />
            </div>
        </div>
    );
};

export default ProductCard;