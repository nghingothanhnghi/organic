import React from 'react';
import QuantityInput from '~/components/quantityInput';
import AddToCartButton from '~/components/addToCartButton';
import AddToWishListButton from '~/components/addToWishListButton';
import ProceedToCheckoutButton from '~/components/proceedToCheckoutButton';
import useResponsive from '~/hooks/useResponsive';
import type { Product } from '~/types/product';

interface ProductActionsProps {
  product: Product; // Updated from 'any' to 'Product'
  selectedQuantity: number;
  setSelectedQuantity: (value: number) => void;
  cartItems: Product[]; // Assuming cart contains Product objects
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  selectedQuantity,
  setSelectedQuantity,
  cartItems
}) => {
  const { isMobile } = useResponsive();
  return (
    <div
      // className="mt-6 gap-4 sm:flex-start flex sm:mt-8"
      className={`mt-6 gap-4 sm:flex-start flex sm:mt-8 ${isMobile ? 'fixed bottom-0 left-0 w-full bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50' : ''}`}
    >
      {/* Quantity Input */}
      <QuantityInput
        value={selectedQuantity}
        onChange={setSelectedQuantity}
        min={1}
      />

      {/* Cart & Wishlist Actions */}
      <div className="grid w-full md:w-auto">
        <div className="flex gap-2">
          <AddToCartButton product={product} quantity={selectedQuantity} />
          <AddToWishListButton product={product} />
        </div>

        {/* Proceed to Checkout Button (Visible only if items are in cart) */}
        {cartItems.length > 0 && (
          <div className="mt-4">
            <ProceedToCheckoutButton closeCart={() => { }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductActions;
