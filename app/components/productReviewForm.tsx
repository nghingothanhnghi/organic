import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { submitReview } from '~/features/reviewSlice';
import { userReviewValidationSchema } from '~/validation/userReviewValidation';
import { useTranslation } from 'react-i18next';

interface ReviewFormProps {
    productId: number;
    onSuccess?: () => void; // Optional callback for success
    onError?: (error: string) => void; // Optional callback for errors
}

const ProductReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess, onError }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.reviews);

    const formik = useFormik({
        initialValues: {
            score: '',
            reviewText: '',
        },
        validationSchema: userReviewValidationSchema(t), // Use the imported schema
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                await dispatch(
                    submitReview({
                        productId,
                        reviewData: {
                            score: Number(values.score),
                            reviewText: values.reviewText,
                        },
                    })
                ).unwrap();

                if (onSuccess) {
                    onSuccess();
                }
                resetForm();
            } catch (error) {
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="score" className="block text-sm font-semibold text-gray-700">
                    {t('reviewForm.score.label')}
                </label>
                <input
                    type="number"
                    name="score"
                    id="score"
                    onChange={formik.handleChange}
                    value={formik.values.score}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${formik.errors.score ? 'border-red-500' : ''
                        }`}
                />
                {formik.errors.score && <div className="text-red-500 text-xs mt-1">{formik.errors.score}</div>}
            </div>
            <div>
                <label htmlFor="reviewText" className="block text-sm font-semibold text-gray-700">
                    {t('reviewForm.reviewText.label')}
                </label>
                <textarea
                    name="reviewText"
                    id="reviewText"
                    rows={4}
                    onChange={formik.handleChange}
                    value={formik.values.reviewText}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${formik.errors.reviewText ? 'border-red-500' : ''
                        }`}
                ></textarea>
                {formik.errors.reviewText && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.reviewText}</div>
                )}
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className="py-3 px-6 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
                >
                    {t('btn.submit')}
                </button>
            </div>
        </form>
    );
};

export default ProductReviewForm;
