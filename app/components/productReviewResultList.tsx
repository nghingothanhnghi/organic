import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import RadioGridSelector from './radioGridSelector';
import { useTranslation } from 'react-i18next';
import { formatDateTime } from '~/utils/formatDateTime';
import type { Rating } from '~/types/product';

interface ProductReviewResultListProps {
  ratings: Rating[]
}

const ProductReviewResultList: React.FC<ProductReviewResultListProps> = ({ ratings }) => {
  const { t } = useTranslation();

  // Keep track of selected values per review (you may need to sync this with backend in real apps)
  const [helpfulSelections, setHelpfulSelections] = useState<{ [reviewId: string]: string | number }>({});

  if (!ratings?.length) {
    return <p className="text-sm text-gray-500">{t('message.no_reviews')}</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
        {t("section_title.view_by_reviews_list.review_title")}
      </h2>

      <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
        {ratings.map((rating) => {
          const { id, attributes } = rating;
          
          const { createdAt, score, reviewText, users_permissions_user } = attributes;
          console.log('User Data:', users_permissions_user);

          const formattedDate = formatDateTime(createdAt ?? new Date().toISOString(), true, "24-hour", "vi");
          const username = users_permissions_user?.data?.attributes?.username || 'Anonymous';
          // const username = users_permissions_user?.data?.attributes?.username || 'Anonymous';
          const selectedValue = helpfulSelections[id];

          const helpfulOptions = [
            {
              id: '0',
              value: 'yes',
              label: t('label.yes'),
              description: '3',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill={selectedValue === 'yes' ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`icon icon-tabler icon-tabler-thumb-up ${selectedValue === 'yes' ? 'text-primary-600' : 'text-gray-400'}`}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                </svg>
              )
            },
            {
              id: '1',
              value: 'no',
              label: t('label.no'),
              description: '0',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill={selectedValue === 'no' ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`icon icon-tabler icon-tabler-thumb-down ${selectedValue === 'no' ? 'text-red-600' : 'text-gray-400'}`}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
                </svg>
              )
            }
          ];


          return (
            <div key={id} className="gap-3 py-6 sm:flex sm:items-start">
              <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`h-4 w-4 ${index < score ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">{score}/5</span>
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {t('section_title.view_by_reviews_list.reviewed_by', { name: username })}</p>
                  <p className="text-xs font-normal text-gray-400 dark:text-gray-400">{formattedDate}</p>
                </div>

                <div className="inline-flex items-center gap-1">
                  <svg className="h-5 w-5 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{t('section_title.view_by_reviews_list.review_verified')}</p>
                </div>
              </div>

              <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                <p className="text-base font-normal text-gray-500 dark:text-gray-400"> {reviewText}</p>
                <div className="flex items-center gap-4">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400"> {t('section_title.view_by_reviews_list.review_helpful')} </p>
                  <RadioGridSelector
                    name={`helpful-${id}`}
                    options={helpfulOptions}
                    columns={2}
                    selectedValue={helpfulSelections[id] || ''}
                    onChange={(value) => setHelpfulSelections(prev => ({ ...prev, [id]: value }))}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductReviewResultList;
