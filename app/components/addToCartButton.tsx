// app/components/addToCartButton.tsx
import { useDispatch } from 'react-redux';
import { addItem } from '~/features/cartSlice';

interface AddToCartButtonProps {
  itemId: string; // The unique ID or name of the item
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ itemId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(itemId)); // Dispatch action to add the item to the cart
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
