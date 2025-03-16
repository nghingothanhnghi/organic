import React, { useState } from 'react';
import Modal from './modal'; // Import your Modal component
import ProductThumb from './productThumb';
import ProductDiscount from './productDiscount';
import ProductPrice from './productPrice';
import ProductVariantSelector from './productVariantSelector';
import ProductActions from './productActions';
import type { ProductCardProps } from '~/types/product';
import { useAppSelector, useAppDispatch } from '~/hooks';
import { useTranslation } from 'react-i18next';

interface QuickViewButtonProps {
    product: ProductCardProps['product'];
}

const QuickViewButton: React.FC<QuickViewButtonProps> = ({ product }) => {
    const {t} = useTranslation();
    const { name, description, variants } = product;
    const [isQuickViewOpen, setQuickViewOpen] = useState(false);
    const cartItems = useAppSelector(state => state.cart.items); // Get cart items from Redux
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
        variants?.find((variant) => variant.isDefault)?.id || null
    ); // Default to the first variant if available

    const handleQuickViewOpen = () => setQuickViewOpen(true);
    const handleQuickViewClose = () => setQuickViewOpen(false);

    const handleVariantChange = (variantId: number) => {
        console.log("Variant changed to:", variantId);
        setSelectedVariantId(variantId);
    };

    const selectedVariant = variants?.find((variant) => variant.id === selectedVariantId);

    return (
        <>
            <button
                className="w-full text-sm text-white font-semibold py-2 px-4 bg-orange-900 hover:bg-orange-800"
                onClick={handleQuickViewOpen}
            >
                {t("btn.quick_view")}
            </button>
            <Modal
                isOpen={isQuickViewOpen}
                onClose={handleQuickViewClose}
                title={
                    <div>
                    <h2 className="text-lg font-bold">{name}</h2>
                    <ProductPrice product={product} variant={selectedVariant} />
                </div>
                }
                content={
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
                        <div className="relative overflow-hidden">
                            <ProductDiscount product={product} />
                            <ProductThumb product={product} className="object-cover w-full h-full" width={400} height={400} />
                        </div>
                        <div className='sm:col-span-1'>
                            <ProductPrice product={product} variant={selectedVariant} />
                            {variants && variants.length > 0 && (
                                <div className="my-4">
                                    <ProductVariantSelector
                                        variants={variants}
                                        selectedVariantId={selectedVariantId}
                                        onVariantChange={(variantId) => {
                                            console.log("Variant changed:", variantId); // Debug: Ensure correct variantId is logged
                                            handleVariantChange(variantId);
                                        }}
                                    />
                                </div>
                            )}
                            {/* <AddToCartButton product={product}/>
                            <ProceedToCheckoutButton closeCart={handleQuickViewClose} /> */}
                                                        <ProductActions
                                product={product}
                                selectedQuantity={selectedQuantity}
                                setSelectedQuantity={setSelectedQuantity}
                                cartItems={cartItems}
                            />
                            <p className="text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: description }} />
                        </div>
                    </div>
                }
                actions={
                    <button
                        onClick={handleQuickViewClose}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        {t("btn.cancel")}
                    </button>
                }
                size="medium"
            />
        </>
    );
};

export default QuickViewButton;
