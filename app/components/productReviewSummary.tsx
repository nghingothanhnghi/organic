// app/components/ProductReviewSummary.tsx
import React from 'react';
import StarIcon from './startIcon';
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const filled = index < Math.floor(rating);
      const half = !filled && index < rating;
      const colorClass =
        filled
          ? 'text-yellow-400'
          : half
            ? 'text-yellow-300'
            : 'text-gray-300';

      return (
        <StarIcon
          key={index}
          className={`h-5 w-5 ${colorClass}`}
          filled={filled}
          half={half}
          readOnly
        />
      );
    });
  };



  return (
    <div className={`review-summary ${className}`}>
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">{t("section_title.view_by-review_summary.customer_reviews")}</h2>
        <div className='flex items-center gap-2 mb-2'>
          <div className="flex items-center">
            {renderStars(averageRating)}
          </div>
          <div className='flex'>
            <small className="text-xs font-normal text-gray-500 dark:text-gray-400">
              {averageRating
                ? t("section_title.view_by-review_summary.average", { rating: averageRating.toFixed(1), max: 5 })
                : t("section_title.view_by-review_summary.noRating")}
            </small>
            <div className="mx-2 h-4 w-px bg-gray-300 hidden md:block"></div>
            <small className="text-xs font-normal text-gray-500 dark:text-gray-400">
              {t("section_title.view_by-review_summary.count", { count: ratingCount })}
            </small>
          </div>
        </div>
      </div>
      <div className="mb-8">
        {ratingDistribution.map(({ star, count, percentage }) => (
          <div className="flex items-center mb-2" key={star}>
            <div className="w-6 text-nowrap mr-3 text-gray-500">
              <span className="inline-block align-middle text-gray-500">{star}</span>
              <StarIcon
                className="ml-1 h-4 w-4 inline-block text-yellow-400"
                filled
                half={false}
                readOnly
              />

            </div>
            <div className="w-full">
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-yellow-400 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
            <span className="w-12 text-gray-500 ml-3">{`${Math.round(percentage)}%`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewSummary;