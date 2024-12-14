// app/components/ProductList.tsx
import React from "react";
import ProductCard from "./productCard";
import type { ProductListProps } from "~/types/product";

const ProductList: React.FC<ProductListProps> = ({ searchResults, viewMode }) => {
    const content = searchResults.length ? (
        searchResults.map((product) => (
            <div
                key={product.id}
                className={`${viewMode === "grid" ? "w-full sm:w-1/2 lg:w-1/4" : "w-full"
                    } p-3`}
            >
                <ProductCard product={product} /> {/* Pass product props */}
            </div>
        ))
    ) : (
        <p className="text-center text-gray-500">No products found.</p>
    );

    return (
        <div
            className={`${viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "flex flex-col"
                }`}
        >
            {content}
        </div>
    );
};

export default ProductList;