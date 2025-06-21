import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import type { Rating } from '~/types/product';

interface ProductReviewResultListProps {
  reviews: Rating[]
}

const ProductReviewResultList: React.FC<ProductReviewResultListProps> = ({ reviews }) => {
  const { t } = useTranslation();

  if (!reviews?.length) {
    return <p className="text-sm text-gray-500">{t('message.no_reviews')}</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white">
        {t('section_title.review_list')}
      </h3>

      {reviews.map((review) => {
        const { id } = review;
    

        return (
          <div key={id} className="border p-4 rounded-md bg-white dark:bg-gray-800">
            <div className="flex items-center mb-1">
              {/* {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-4 w-4 ${
                    index < score ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">{score}/5</span> */}
            </div>
            {/* <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              {reviewText}
            </div>
            <div className="text-xs text-gray-400">
              {t('label.reviewed_by', { name: username })}
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default ProductReviewResultList;
