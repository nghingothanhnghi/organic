// app/components/checkoutProcess/userConfirmInfo.tsx
import React from 'react';
import { useFormik } from 'formik';
import { userConfirmValidationSchema } from '~/validation/userConfirmValidation';

const UserConfirmInfo: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            termsAndConditions: false,
        },
        validationSchema: userConfirmValidationSchema,
        onSubmit: (values) => {
            // Handle form submission (final confirmation of the order)
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="flex items-center">
                <input
                    id="termsAndConditions"
                    type="checkbox"
                    name="termsAndConditions"
                    onChange={formik.handleChange}
                    checked={formik.values.termsAndConditions}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="termsAndConditions" className="ml-2 text-sm text-gray-700">
                    I accept the terms and conditions
                </label>
            </div>
            {formik.errors.termsAndConditions && (
                <div className="text-red-500 text-xs">{formik.errors.termsAndConditions}</div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="w-full py-3 px-6 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Confirm Order
                </button>
            </div>
        </form>
    );
};

export default UserConfirmInfo;
