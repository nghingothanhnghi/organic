import React from 'react';
import { useAppSelector, useAppDispatch } from '~/hooks';
import { updateQuantity, removeFromCart } from '~/features/cartSlice'; // Adjust the path to your slice
import QuantityInput from './quantityInput';
import { calculateSubtotal, calculateTotal } from '~/utils/calculate';

const CartList: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cart.items);

    const handleQuantityChange = (id: number, quantity: number) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="cart-list">
            {cartItems.length > 0 ? (
                <div className="cart-items space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border p-4 rounded-md shadow-sm">
                            <div className="flex items-center space-x-4">
                                <img src={item.imageUrl || undefined} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                <div className='flex-column space-y-1'>
                                    <h3 className="text-sm font-medium">{item.name}</h3>
                                    <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                                    <QuantityInput
                                        value={item.quantity}
                                        min={1}
                                        onChange={(quantity) => handleQuantityChange(item.id, quantity)}
                                    />
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold">
                                    ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary mt-6 p-4 border-t border-gray-300">
                        <h3 className="text-xl font-semibold">
                        Total: ${calculateTotal(cartItems).toFixed(2)}
                        </h3>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartList;
