import * as Yup from 'yup';
import type { TFunction } from 'i18next'; // For localized validation messages

export const userReviewValidationSchema = (
  t: (key: string, options?: any) => string
) =>
  Yup.object({
    score: Yup.number()
      .min(1, t('validation.reviewScoreMin', { defaultValue: 'Score must be at least 1.' }))
      .max(5, t('validation.reviewScoreMax', { defaultValue: 'Score cannot exceed 5.' }))
      .required(t('validation.reviewScoreRequired', { defaultValue: 'Score is required.' })),
    reviewText: Yup.string().required(
      t('validation.reviewTextRequired', { defaultValue: 'Review message is required.' })
    ),
  });




