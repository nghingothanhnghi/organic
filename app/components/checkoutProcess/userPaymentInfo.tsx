// pp/components/checkoutProcess/userPaymentInfo.tsx
import React from 'react';
import { useFormik } from 'formik';
import { userPaymentValidationSchema } from '~/validation/userPaymentValidation';

const UserPaymentInfo: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            expirationDate: '',
            cvv: '',
        },
        validationSchema: userPaymentValidationSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    onChange={formik.handleChange}
                    value={formik.values.cardNumber}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.cardNumber && <div className="text-red-500 text-xs">{formik.errors.cardNumber}</div>}
            </div>

            <div>
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                <input
                    id="expirationDate"
                    type="text"
                    name="expirationDate"
                    onChange={formik.handleChange}
                    value={formik.values.expirationDate}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.expirationDate && <div className="text-red-500 text-xs">{formik.errors.expirationDate}</div>}
            </div>

            <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                    id="cvv"
                    type="text"
                    name="cvv"
                    onChange={formik.handleChange}
                    value={formik.values.cvv}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.cvv && <div className="text-red-500 text-xs">{formik.errors.cvv}</div>}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="w-full py-3 px-6 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default UserPaymentInfo;
