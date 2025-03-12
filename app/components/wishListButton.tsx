import { Link } from 'react-router';
import { useAppSelector } from '~/hooks';


const WishlistButton: React.FC = () => {

  // Get the wishlist count from the Redux store
  const wishlistCount = useAppSelector(state => state.wishlist.items.length);

  return (
    <Link
      to="/wishlist"
      className="relative text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors rounded-full p-2"
    >
      {/* Wishlist Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>

      {/* Badge */}
      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 inline-block w-5 h-5 bg-red-500 text-white text-xs rounded-full text-center leading-5">
          {wishlistCount}
        </span>
      )}
    </Link>
  );
};

export default WishlistButton;
