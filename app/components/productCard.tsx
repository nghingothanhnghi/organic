// app/components/ProductCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAppSelector } from '~/hooks';
import ProductThumb from './productThumb';
import ProductPrice from './productPrice';
import ProductDiscount from './productDiscount';
import AddToCartButton from "./addToCartButton";
import ProceedToCheckoutButton from './proceedToCheckoutButton';
import QuickViewButton from './quickViewButton';
import ProductRating from './productRating';
import Modal from './modal';
import type { ProductCardProps } from '~/types/product';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, slug, ratings } = product;
    const cartItems = useAppSelector(state => state.cart.items); // Get cart items from Redux state

    // Check if the current product is in the cart
    const isItemInCart = cartItems.some((item) => item.id === product.id); // Use `name` or another unique property

    const closeCart = () => {
        // Implement logic to close cart sidebar if required
        console.log("Close cart sidebar");
    };
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 group">
            {/* Image Section */}
            <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
                <ProductThumb product={product} className="object-cover w-full h-full" width={400} height={400} />
                {/* Add to Cart Button */}
                <div className="mt-4 absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <AddToCartButton product={product} className=' rounded-none' />
                    {isItemInCart && (
                        <ProceedToCheckoutButton closeCart={closeCart} rounded={false} />
                    )}
                    <QuickViewButton product={product} />
                </div>
                {/* Discount Badge */}
                <ProductDiscount product={product} />
            </div>
            {/* Content Section */}
            <div className="p-4">
                <Link
                    to={`/products/${slug}`}
                    className="text-sm font-semibold text-gray-900  hover:text-blue-500"
                >
                    <div className='truncate'>{name}</div>
                </Link>
                <ProductRating product={product} singleStarView={true} />
                <ProductPrice product={product} className='mt-2 text-sm' />
            </div>
        </div>
    );
};

export default ProductCard;