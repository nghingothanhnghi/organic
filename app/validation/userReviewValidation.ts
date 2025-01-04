import * as Yup from 'yup';
import type { TFunction } from 'i18next'; // For localized validation messages

export const userReviewValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    score: Yup.number()
      .required(t('validation.score.required'))
      .min(1, t('validation.score.min'))
      .max(5, t('validation.score.max')),
    reviewText: Yup.string()
      .required(t('validation.reviewText.required'))
      .min(10, t('validation.reviewText.min')),
  });
