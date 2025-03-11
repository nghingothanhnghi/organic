// pp/components/checkoutProcess/userPaymentInfo.tsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { userPaymentValidationSchema } from '~/validation/userPaymentValidation';
import MaskedInputDate from '../maskedInputDate';
import RadioGridSelector from '../radioGridSelector';

interface UserPaymentInfoProps {
    onNext: () => void;
    handlePrevious: () => void;
    setIsValid: (isValid: boolean) => void;
    setPaymentData: (data: any) => void; // New prop to update parent state
}

const UserPaymentInfo: React.FC<UserPaymentInfoProps> = ({ onNext, handlePrevious, setIsValid, setPaymentData }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | number>('1'); // Default value is '1' for Cash

    const formik = useFormik({
        initialValues: {
            paymentMethod: selectedPaymentMethod,
            cardNumber: '',
            expirationDate: '',
            cvv: '',
        },
        validationSchema: userPaymentValidationSchema(),
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

    const handlePaymentMethodChange = (value: string | number) => {
        console.log("Selected Payment Method:", value);
        setSelectedPaymentMethod(value); // Update payment method
        formik.setFieldValue("paymentMethod", value);

        // Reset form fields when switching to Cash
        if (value === '1') {
            formik.setValues({ paymentMethod: '1', cardNumber: '', expirationDate: '', cvv: '' });
        }
    };

    // Payment method options for radio grid
    const paymentOptions = [
        { id: '1', label: 'Cash', value: "1" },       // value is a string
        { id: '2', label: 'Credit Card', value: "2" }    // value is a number
    ];

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Payment method selector */}
            <RadioGridSelector
                name="paymentMethod"
                options={paymentOptions}
                selectedValue={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
            />
            {/* Show card details only when the payment method is 'Credit Card' */}
            {selectedPaymentMethod === '2' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="sm:col-span-2 lg:col-span-2">
                        <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                        <input
                            id="cardNumber"
                            type="text"
                            name="cardNumber"
                            onChange={formik.handleChange}
                            value={formik.values.cardNumber}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.errors.cardNumber && <div className="text-red-500 text-xs mt-1">{formik.errors.cardNumber}</div>}
                    </div>
                    <div className="sm:col-span-1 lg:col-span-1">
                        <label htmlFor="expirationDate" className="block text-sm font-semibold text-gray-700 mb-2">Expiration date (MM/YY)</label>
                        <MaskedInputDate
                            id="expirationDate"
                            name="expirationDate"
                            mask="MM/YYYY"
                            value={formik.values.expirationDate}
                            onChange={formik.handleChange}
                            placeholder="MM/YYYY"
                            className="w-full"
                            error={formik.errors.expirationDate}
                        />
                    </div>
                    <div className="sm:col-span-1 lg:col-span-1">
                        <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                        <input
                            id="cvv"
                            type="text"
                            name="cvv"
                            onChange={formik.handleChange}
                            value={formik.values.cvv}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.errors.cvv && <div className="text-red-500 text-xs mt-1">{formik.errors.cvv}</div>}
                    </div>
                </div>

            )}

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
