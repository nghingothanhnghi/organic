import React from 'react';
import type { Product } from '../types/product'; // Adjust the import as needed
import StarIcon from './startIcon';
import { useTranslation } from 'react-i18next';


interface ProductRatingProps {
  product: Product;
  singleStarView?: boolean; // New prop to control display mode
}

const ProductRating: React.FC<ProductRatingProps> = ({ product, singleStarView = false }) => {
  const {t} = useTranslation();
  // Calculate the average rating (if ratings exist)
  const ratings = product.ratings || [];
  const totalRatings = ratings.length;
  const averageRating =
    totalRatings > 0
      ? ratings.reduce((acc, rating) => acc + rating.attributes.score, 0) / totalRatings
      : 0;

  if (singleStarView) {
    return (
      <div className="flex items-center justify-between gap-2 mt-1">
        <div className='flex items-center gap-1'>
          <StarIcon
            filled={averageRating >= 1}
            half={averageRating >= 0.5 && averageRating < 1}
            className="w-4 h-4 text-yellow-300"
          />
          <span className="text-xs font-normal text-gray-400 dark:text-gray-400">
            ({averageRating.toFixed(1)})
          </span>
        </div>
        <span className="text-xs text-gray-400 font-normal dark:text-gray-400">
          {totalRatings} {t("info.review.message_02")}
        </span>
      </div>
    );
  }

  // Generate stars based on average rating
  const fullStars = Math.floor(averageRating);
  const emptyStars = 5 - fullStars;
  const hasHalfStar = averageRating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex items-center gap-1">
        {/* Render full stars */}
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <StarIcon key={index} filled={true} half={false} className="w-4 h-4 text-yellow-300" />
          ))}

        {/* Render half star if applicable */}
        {hasHalfStar && (
          <StarIcon key="half" filled={false} half={true} className="w-4 h-4 text-yellow-300" />
        )}

        {/* Render empty stars */}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <StarIcon key={index + fullStars} filled={false} half={false} className="w-4 h-4 text-yellow-300" />
          ))}
        <span className="text-xs font-normaltext-gray-400 dark:text-gray-400">
          ({averageRating.toFixed(1)})
        </span>
      </div>
      <span className="text-xs text-gray-400 font-normal dark:text-gray-400">
        {totalRatings} {t("info.review.message_02")}
      </span>
    </div>
  );
};

export default ProductRating;
