// app/components/wishList.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '~/hooks';
import ProductThumb from '~/components/productThumb';
import ProductPrice from '~/components/productPrice';
import AddToCartButton from './addToCartButton';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { removeFromWishlist } from '~/features/wishlistSlice';

const WishList: React.FC = () => {
    const { t } = useTranslation();
    // Access wishlist items from Redux state.
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(state => state.wishlist.items);
    const cartItems = useAppSelector(state => state.cart.items);

    // If wishlist is empty, render a message.
    if (!wishlistItems || wishlistItems.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600">Your wishlist is empty.</p>
                <Link to="/" className="text-blue-500 underline">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // Otherwise, render the wishlist items in a grid.
    return (
        <div className="wish-list">
            <div className="wish-items space-y-4">
                {wishlistItems.map((item) => {
                    const inCart = cartItems.some(cartItem => cartItem.id === item.id);
                    return (
                        <div key={item.id} className="flex justify-between items-center border p-4 rounded-md shadow-sm">
                            <div className="flex space-x-4">
                                <ProductThumb product={item} className="w-16 h-16 object-cover rounded-md" />
                                <div className='flex-column space-y-1'>
                                    <h3 className="text-sm font-medium">{item.name}</h3>
                                    <ProductPrice product={item} className="text-xs" />
                                    <button
                                        onClick={() => dispatch(removeFromWishlist(item.id))}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        {t("btn.remove")}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {!inCart && (
                                    <AddToCartButton
                                        product={item}
                                        quantity={1}
                                        className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition"
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WishList;
