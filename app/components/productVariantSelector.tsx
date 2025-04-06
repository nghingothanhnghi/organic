import React, { useEffect } from 'react';
import ProductVariantThumb from './productVariantThumb';
import type { ProductVariant } from '../types/product'; // Import type from shared definitions

interface ProductVariantSelectorProps {
  variants: ProductVariant[]; // Use imported type
  selectedVariantId: number | null; // Selected variant's ID
  onVariantChange: (variantId: number) => void; // Callback to handle variant selection
}

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  variants,
  selectedVariantId,
  onVariantChange,
}) => {
  console.log("Variants:", variants);
  useEffect(() => {
    console.log("Selected variant ID:", selectedVariantId);
  }, [selectedVariantId]);
  return (
    <fieldset className="flex flex-wrap gap-3">
      <legend className="sr-only">Variants</legend>
      {variants.map((variant) => {
        const thumbUrl = variant.media?.attributes.formats.thumbnail.url || null;

        return (
          <label
            key={variant.id}
            htmlFor={`variant-${variant.id}`}
            className={`flex items-center justify-center cursor-pointer rounded-full shadow-sm 
              ${variant.name ? 'px-2 py-2' : 'size-7'}
              ${selectedVariantId === variant.id
                ? 'ring-2 ring-black ring-offset-2' : ''}
              `}
          >
            <input
              type="radio"
              name="variantOption"
              value={variant.id}
              id={`variant-${variant.id}`}
              className="sr-only"
              checked={selectedVariantId === variant.id}
              onChange={() => onVariantChange(variant.id)}
            />
            {thumbUrl ? (
              // Display the thumbnail using ProductVariantThumb
              <ProductVariantThumb variant={variant} className="h-8 w-8" />
            ) : (
              // Fallback if no image is available
              <span
                className='rounded-full'
                style={{
                  display: 'block',
                  // width: '24px',
                  // height: '24px',
                  background: variant.image || '#ccc', // Use color or fallback
                }}
              >
                {/* Accessible name */}
                <span className="sr-only">{variant.name}</span>
              </span>
            )}
            {/* Display name if it exists */}
            {variant.name && (
              <span className="text-center text-gray-700 dark:text-gray-200">
                {variant.name}
              </span>
            )}
          </label>
        );
      })}

    </fieldset>
  );
};

export default ProductVariantSelector;
