// app/components/addToCartButton.tsx
import { useDispatch } from 'react-redux';
import { addItem } from '~/features/cartSlice';
import type { Product } from '~/types/product';

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
    const dispatch = useDispatch();
  
    const handleAddToCart = () => {
      dispatch(addItem(product)); // Add the entire product object to the cart
    };
  
    return <button onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCartButton;
