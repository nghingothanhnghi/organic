// app/components/ProductCard.tsx
import React from 'react';
import AddToCartButton from "./addToCartButton";
import type { Product } from '~/types/product';

interface ProductCardProps {
    product: Product; // Expect the whole product object
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, price, imageUrl } = product;
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
            {/* Image Section */}
            <div className="relative w-full h-56 bg-gray-200">
                <img
                    src={imageUrl || '/placeholder.jpg'} // Default placeholder image if no imageUrl
                    alt={name}
                    className="object-cover w-full h-full"
                />
            </div>
            {/* Content Section */}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 truncate">{name}</h3>
                {/* Price */}
                <p className="mt-3 text-lg font-semibold text-gray-800">
                    ${price.toFixed(2)}
                </p>
                {/* Add to Cart Button */}
                <div className="mt-4">
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;