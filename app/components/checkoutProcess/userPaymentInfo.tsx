// pp/components/checkoutProcess/userPaymentInfo.tsx
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { userPaymentValidationSchema } from '~/validation/userPaymentValidation';

interface UserPaymentInfoProps {
    onNext: () => void;
    handlePrevious: () => void;
    setIsValid: (isValid: boolean) => void;
    setPaymentData: (data: any) => void; // New prop to update parent state
}

const UserPaymentInfo: React.FC<UserPaymentInfoProps> = ({ onNext, handlePrevious, setIsValid, setPaymentData }) => {
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
            setPaymentData(values); // Update parent state with payment data
            setIsValid(formik.isValid); // Update validity state
            onNext(); // Move to the next step
        },
    });

    // Update isValid based on formik's validation state
    useEffect(() => {
        setIsValid(formik.isValid && formik.dirty);  // Ensure form is dirty before considering it valid
    }, [formik.isValid, formik.dirty, setIsValid]);

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
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
                <label htmlFor="expirationDate" className="block text-sm font-semibold text-gray-700 mb-2">Expiration date (MM/YY)</label>
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
                <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
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

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={handlePrevious} // Call the handlePrevious function
                    className="py-3 px-6 rounded-md bg-gray-400 text-white hover:bg-gray-500"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="py-3 px-6  text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default UserPaymentInfo;
