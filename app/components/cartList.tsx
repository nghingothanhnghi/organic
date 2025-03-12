import React from 'react';
import { useLocation, Link } from 'react-router';
import { useAppSelector, useAppDispatch } from '~/hooks';
import { updateQuantity, removeFromCart } from '~/features/cartSlice'; // Adjust the path to your slice
import QuantityInput from './quantityInput';
import ProductThumb from './productThumb';
import ProductPrice from './productPrice';
import { calculateSubtotal } from '~/utils/calculate';
import { formatPrice } from '~/utils/formatPrice';
import { useTranslation } from 'react-i18next';
import EmptyState from './emptyState';

const CartList: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cart.items);
    const location = useLocation();

    const handleQuantityChange = (id: number, quantity: number) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };
    // Check if the current path is '/checkout'
    const isCheckoutPage = location.pathname === '/checkout';

    if (!cartItems || cartItems.length === 0) {
        return (
            <EmptyState
                messageKey="info.cart.empty"
                fallbackMessage="Your cart is empty."
                image="/assets/empty-cart.png"
                lottieSrc="https://lottie.host/embed/35e4c536-4034-4737-a2cc-2852b01d2b4b/lL86Lcve9X.lottie"
                link="/"
                linkTextKey="btn.continueShopping"
                fallbackLinkText="Continue Shopping"
            />
        );
    }

    return (
        <div className="cart-list">
            <div className="cart-items space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between border p-4 rounded-md shadow-sm">
                        <div className="flex space-x-4">
                            <ProductThumb product={item} className='w-16 h-16 object-cover rounded-md' />
                            <div className='flex-column space-y-1'>
                                <h3 className="text-sm font-medium">
                                    {item.name} {isCheckoutPage && (<sup className='text-gray-500'>x{item.quantity}</sup>)}
                                </h3>
                                <ProductPrice product={item} className='text-xs' />
                                {!isCheckoutPage && (
                                    <>
                                        <QuantityInput
                                            value={item.quantity}
                                            min={1}
                                            onChange={(quantity) => handleQuantityChange(item.id, quantity)}
                                        />
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            {t("btn.remove")}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">
                                {formatPrice(calculateSubtotal(item.discountPrice || item.price, item.quantity))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartList;
