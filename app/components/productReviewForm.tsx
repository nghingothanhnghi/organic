import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { submitReview, clearError, clearSuccess } from '~/features/reviewSlice';
import { userReviewValidationSchema } from '~/validation/userReviewValidation';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import useScrollToTarget from '~/hooks/useScrollToTarget';
import StarIcon from './startIcon';

interface ReviewFormProps {
    productId: number;
    onSuccess?: () => void; // Optional callback for success
    onError?: (error: string) => void; // Optional callback for errors
    onReviewSubmitted?: () => void; // Callback to refresh product data
}

const ProductReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess, onError, onReviewSubmitted }) => {
    const { targetRef } = useScrollToTarget();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector(state => state.auth);
    console.log('Auth state:', useAppSelector(state => state.auth));

    const { loading, error, success } = useAppSelector(state => state.reviews);

    useEffect(() => {
        if (success) {
            toast.success(t('success.review.message_01') || 'Đánh giá của bạn đã được gửi thành công!');
            if (onSuccess) onSuccess();
            if (onReviewSubmitted) onReviewSubmitted(); // Refresh product data
            dispatch(clearSuccess());
        }
    }, [success, onSuccess, onReviewSubmitted, dispatch]);

    useEffect(() => {
        if (error) {
            if (onError) onError(error);
            dispatch(clearError());
        }
    }, [error, onError, dispatch]);

    const [selectedScore, setSelectedScore] = useState<number>(0);

    const formik = useFormik({
        initialValues: {
            score: 0,
            reviewText: '',
        },
        validationSchema: userReviewValidationSchema(t), // Use the imported schema
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            console.log('Formik values:', values);
            console.log('Selected score:', selectedScore);
            console.log('Authenticated:', isAuthenticated);
            console.log('User data:', user);
            if (!isAuthenticated) {
                toast.error(t('error.review.message_01') || 'Please log in to submit a review.');
                // Optionally handle the case when the user is not logged in
                if (onError) {
                    onError('Please log in to submit a review.');
                }
                return;
            }

            if (!user || !user.id) {
                toast.error(t('error.user_info_missing') || 'User information is missing.');
                // Handle missing user ID gracefully
                if (onError) {
                    onError('User information is missing.');
                }
                return;
            }

            try {
                // Adjust the structure of the data to match the expected format
                const reviewData = {
                    productId,
                    score: selectedScore,
                    reviewText: values.reviewText,
                    userId: user.id, // Assuming `user.id` exists
                };

                await dispatch(submitReview(reviewData)).unwrap();

                resetForm();
                setSelectedScore(0); // Reset the star rating
            } catch (error) {
                toast.error(t('error.review.message_03') || 'Failed to submit review.');
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });



    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div ref={targetRef}>
                <label htmlFor="score" className="block text-sm font-semibold text-gray-700">
                    {t("section_title.view_by-add_review.global_ratings")}
                </label>
                <div className='flex justify-between'>
                    <div className="flex space-x-2 mt-1">
                        {[1, 2, 3, 4, 5].map((score) => (
                            <StarIcon
                                key={score}
                                filled={score <= selectedScore}
                                half={false}
                                className="cursor-pointer text-yellow-400"
                                onClick={() => {
                                    setSelectedScore(score);
                                    formik.setFieldValue('score', score);  // Sync Formik with the selected score
                                }}
                                readOnly={formik.isSubmitting || formik.isValidating}
                            />
                        ))}
                    </div>
                    <div className='flex gap-3 text-xs text-gray-500 dark:text-gray-400'>
                        <span>{t("section_title.view_by-add_review.voted_star")}</span>
                        <span>{selectedScore} / 5</span>
                    </div>
                </div>
            </div>
            <div>
                <textarea
                    name="reviewText"
                    id="reviewText"
                    placeholder={t("section_title.view_by-add_review.placeholder_message")}
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
                    {formik.isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 018 8h-4l3.5 3.5L20 12h-4a8 8 0 01-8 8v-4l-3.5 3.5L4 12z"
                                ></path>
                            </svg>
                            <span>{t('btn.sending') || 'Đang gửi...'}</span>
                        </div>
                    ) : (
                        t('btn.send_review')
                    )}
                </button>

            </div>
        </form>
    );
};

export default ProductReviewForm;
