// app/components/ProductReviewSummary.tsx
import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import type { Product } from '~/types/product';
import { useTranslation } from 'react-i18next';

interface ProductReviewSummaryProps {
  product: Product;
  className?: string;
}

const ProductReviewSummary: React.FC<ProductReviewSummaryProps> = ({ 
  product,
  className = '' 
}) => {

    const { t } = useTranslation();

  // Access product attributes
  const {
    averageRating = 0,
    ratings = []
  } = product;

  // Get the ratings array
  const ratingsArray = Array.isArray(ratings) ? ratings : [];

  // Calculate rating distribution
  const ratingCount = ratingsArray.length;
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const star = i + 1;
    const count = ratingsArray.filter(r => r.attributes?.score === star).length;
    const percentage = ratingCount ? (count / ratingCount) * 100 : 0;
    return { star, count, percentage };
  });

  // Generate stars for average rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400' 
            : index < rating && rating % 1 > 0 
              ? 'text-yellow-300' // Half star (lighter color)
              : 'text-gray-300'
        }`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <div className={`review-summary ${className}`}>
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">{t("section_title.view_by-review_summary.customer_reviews")}</h2>
        <span>
          <div className="flex items-center">
            {renderStars(averageRating)}
          </div>
          <span className='flex'>
            <small className="text-sm text-gray-500">
              {averageRating ? `${averageRating.toFixed(1)} out of 5` : 'No ratings yet'}
            </small>
            <div className="mx-2 h-4 w-px bg-gray-300 hidden md:block"></div>
            <small className="text-sm text-gray-500">{`${ratingCount} global ratings`}</small>
          </span>
        </span>
      </div>
      <div className="mb-8">
        {ratingDistribution.map(({ star, count, percentage }) => (
          <div className="flex items-center mb-2" key={star}>
            <div className="text-nowrap mr-3 text-gray-500">
              <span className="inline-block align-middle text-gray-500">{star}</span>
              <StarIcon className="ml-1 h-4 w-4 inline-block text-yellow-400" />
            </div>
            <div className="w-full">
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-yellow-400 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
            <span className="text-gray-500 ml-3">{`${Math.round(percentage)}%`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewSummary;