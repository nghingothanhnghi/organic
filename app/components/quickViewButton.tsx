import React, { useState } from 'react';
import Modal from './modal'; // Import your Modal component
import ProductThumb from './productThumb';
import ProductDiscount from './productDiscount';
import ProductPrice from './productPrice';
import QuantityInput from './quantityInput';
import ProceedToCheckoutButton from './proceedToCheckoutButton';
import AddToCartButton from './addToCartButton';
import type { ProductCardProps } from '~/types/product';
import { useAppDispatch } from '~/hooks'
import { addToCart, updateQuantity } from '~/features/cartSlice';

interface QuickViewButtonProps {
    product: ProductCardProps['product'];
}

const QuickViewButton: React.FC<QuickViewButtonProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const { name, description, id } = product;
    const [isQuickViewOpen, setQuickViewOpen] = useState(false);
    const [quantity, setQuantity] = useState(1); // Set initial quantity

    const handleQuickViewOpen = () => setQuickViewOpen(true);
    const handleQuickViewClose = () => setQuickViewOpen(false);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity); // Update quantity in local state
        }
    };

    return (
        <>
            <button
                className="w-full text-sm text-white font-semibold py-2 px-4 bg-orange-900 hover:bg-orange-800"
                onClick={handleQuickViewOpen}
            >
                Quick View
            </button>
            <Modal
                isOpen={isQuickViewOpen}
                onClose={handleQuickViewClose}
                title="Quick View"
                content={
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
                        <div className="relative overflow-hidden">
                        <ProductDiscount product={product}/>
                            <ProductThumb product={product} className="object-cover w-full h-full" width={400} height={400} />
                        </div>
                        <div className='sm:col-span-1'>
                            <h4 className="text-lg font-bold">{name}</h4>
                            <ProductPrice product={product}/>
                            <QuantityInput 
                                value={quantity} 
                                min={1} 
                                onChange={handleQuantityChange} 
                            />
                                  <AddToCartButton
                            product={product} 
                            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
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
                        Close
                    </button>
                }
                size="medium"
            />
        </>
    );
};

export default QuickViewButton;
