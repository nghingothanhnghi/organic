// app/components/addToCartButton.tsx
import { useDispatch } from 'react-redux';
import { addItem } from '~/features/cartSlice';
import type { Product } from '~/types/product';

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product)); // Add the entire product object to the cart
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
