import React,  {useEffect} from 'react';
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

      {variants.map((variant) => (
        <label
          key={variant.id}
          htmlFor={`variant-${variant.id}`}
          className={`block size-8 cursor-pointer rounded-full shadow-sm ${
            selectedVariantId === variant.id
              ? 'ring-2 ring-black ring-offset-2'
              : ''
          }`}
          style={{ backgroundColor: variant.value }} // Assuming `value` holds a color name or code
        >
          <input
            type="radio"
            name="variantOption"
            value={variant.id}
            id={`variant-${variant.id}`}
            className="sr-only"
            checked={selectedVariantId === variant.id}
            onChange={() => {
              console.log("Selected:", selectedVariantId, "Variant ID:", variant.id);
              onVariantChange(variant.id);
            }}
          />
          <span className="sr-only">{variant.name}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default ProductVariantSelector;
