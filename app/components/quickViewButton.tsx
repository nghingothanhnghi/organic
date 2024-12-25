import React, { useState } from 'react';
import Modal from './modal'; // Import your Modal component
import ProductThumb from './productThumb';
import type { ProductCardProps } from '~/types/product';

interface QuickViewButtonProps {
    product: ProductCardProps['product'];
}

const QuickViewButton: React.FC<QuickViewButtonProps> = ({ product }) => {
    const { name, price, description, discount, discountPrice } = product;
    const [isQuickViewOpen, setQuickViewOpen] = useState(false);

    const handleQuickViewOpen = () => setQuickViewOpen(true);
    const handleQuickViewClose = () => setQuickViewOpen(false);

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
                    <div>
                        <ProductThumb product={product} className="object-cover w-full h-full" width={400} height={400} />
                        <h4 className="text-lg font-bold">{name}</h4>
                        <p className="text-gray-700 mt-2">{description}</p>
                        <p className="text-gray-900 font-semibold mt-2">Price: ${price.toFixed(2)}</p>
                        {discount && <p className="text-green-600 font-semibold mt-1">Discount: {discount}%</p>}
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
            />
        </>
    );
};

export default QuickViewButton;
