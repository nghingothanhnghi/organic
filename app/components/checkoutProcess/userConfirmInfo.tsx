// app/components/checkoutProcess/userConfirmInfo.tsx
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { userConfirmValidationSchema } from '~/validation/userConfirmValidation';
import { useTranslation } from 'react-i18next';


interface UserConfirmInfoProps {
    setIsValid: (isValid: boolean) => void;  // Function to update parent validity state
    shippingData: any; // Received from parent
    paymentData: any;  // Received from parent
    onSubmit: (finalData: any) => void; // Final submit handler
}

const UserConfirmInfo: React.FC<UserConfirmInfoProps> = ({ setIsValid, shippingData, paymentData, onSubmit }) => {
    console.log("paymentData form Confirm:", paymentData);
    const {t} = useTranslation()
    const formik = useFormik({
        initialValues: {
            termsAndConditions: false,
        },
        validationSchema: userConfirmValidationSchema,
        onSubmit: (values) => {
            // Handle form submission (final confirmation of the order)
            console.log(values);
            // Combine all collected data into one object
            const finalData = {
                shipping: { ...shippingData },  // Spread shippingData
                payment: { ...paymentData },  // Spread paymentData
                termsAndConditions: values.termsAndConditions,  // Include terms and conditions confirmation
            };
            onSubmit(finalData); // Call parent's submit function
        },
    });

    // Update the parent component's isValid state
    useEffect(() => {
        setIsValid(formik.isValid && formik.dirty); // Ensure form is dirty before valid
    }, [formik.isValid, formik.dirty, setIsValid]);

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Shipping Information Preview */}
            <div className="border-b pb-7 p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-500 mb-3">{t("section_title.view_by_user_shipping_info.title")}</h3>
                <p className='flex justify-between mb-2'><strong>{t("input.fullName.label")}:</strong> {shippingData.firstName} {shippingData.lastName}</p>
                <p className='flex justify-between mb-2'><strong>{t("input.address.label")}:</strong> {shippingData.address}</p>
                <p className='flex justify-between mb-2'><strong>Country:</strong> {shippingData.country}</p>
                <p className='flex justify-between mb-2'><strong>City:</strong> {shippingData.city}</p>
                <p className='flex justify-between mb-2'><strong>District:</strong> {shippingData.district}</p>
                <p className='flex justify-between mb-2'><strong>Ward:</strong> {shippingData.ward}</p>
                <p className='flex justify-between mb-2'><strong>Postal Code:</strong> {shippingData.postalCode}</p>
            </div>

            {/* Payment Information Preview */}
            <div className="border-b pb-5 p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-500 mb-3">{t("section_title.view_by_user_payment_info.title")}</h3>
                <p className='flex justify-between mb-2'><strong>Payment Method:</strong></p>
                <p className='flex justify-between mb-2'><strong>Card Number:</strong> **** **** **** {paymentData?.cardNumber?.slice(-4) || 'N/A'}</p>
                <p className='flex justify-between mb-2'><strong>Expiration Date:</strong> {paymentData.expirationDate}</p>
            </div>
            <div className="flex items-center">
                <input
                    id="termsAndConditions"
                    type="checkbox"
                    name="termsAndConditions"
                    onChange={formik.handleChange}
                    checked={formik.values.termsAndConditions}
                    className="h-4 w-4 text-green-600 border-green-300 rounded focus:ring-2 focus:ring-green-500"
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
                    className="py-3 px-6 mt-4  rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Confirm Order
                </button>
            </div>
        </form>
    );
};

export default UserConfirmInfo;
