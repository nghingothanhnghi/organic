// app/components/ProductCard.tsx
import React from 'react';
import AddToCartButton from "./addToCartButton";
import type { Product } from '~/types/product';

interface ProductCardProps {
    product: Product; // Expect the whole product object
  }

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, price } = product;
    return (
        <div className="product-card">
            <h2>{name}</h2>
            <p>Price: ${price.toFixed(2)}</p>
            {/* Add to Cart button */}
            <AddToCartButton product={product} />
        </div>
    );
};

export default ProductCard;