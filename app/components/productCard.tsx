// app/components/ProductCard.tsx
import React from 'react';
import AddToCartButton from "./addToCartButton";
import type { Product } from '~/types/product';

const ProductCard: React.FC<Product> = ({ id, name, price }) => {
    return (
        <div className="product-card">
            <h2>{name}</h2>
            <p>Price: ${price.toFixed(2)}</p>
            {/* Add to Cart button */}
            <AddToCartButton itemId={id} />
        </div>
    );
};

export default ProductCard;