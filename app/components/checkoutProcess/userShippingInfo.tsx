// pp/components/checkoutProcess/userShippingInfo.tsx
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { userShippingValidationSchema } from '~/validation/userShippingValidation';
import LocationSelector from '../locationSelector';
import PhoneNumberInput from '../phoneNumberInput';
import { useTranslation } from 'react-i18next';

interface ShippingData {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    street?: string;
    country?: string;
    city?: string;
    district?: string;
    ward?: string;
    postalCode?: string;
}

interface UserShippingInfoProps {
    onNext: () => void;
    setShippingData: (data: any) => void; // Setter function to update shipping data
    setIsValid: (isValid: boolean) => void;
    shippingData?: ShippingData; // Optional prefilled shipping data
    isGuest: boolean; // Add isGuest prop
}

const UserShippingInfo: React.FC<UserShippingInfoProps> = ({ onNext, setIsValid, setShippingData, shippingData = {}, isGuest }) => {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            firstName: shippingData.firstName || '',
            lastName: shippingData.lastName || '',
            email: shippingData.email || '',
            phoneNumber: shippingData.phoneNumber || '+84',
            street: shippingData.street || '',
            country: shippingData.country || '',
            city: shippingData.city || '',
            district: shippingData.district || '',
            ward: shippingData.ward || '',
            postalCode: shippingData.postalCode || '',
        },
        enableReinitialize: true, // Reinitialize form when shippingData changes
        validationSchema: userShippingValidationSchema(t),
        onSubmit: (values) => {
            // Handle form submission
            console.log(values);
            setShippingData(values);
            setIsValid(formik.isValid); // Update validity state
            onNext();
        },
    });

    // Set validity when validation changes
    useEffect(() => {
        setIsValid(formik.isValid);
    }, [formik.isValid]);

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1 sm:col-span-1">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">{t("input.firstName.label")}</label>
                    <input
                        type="text"
                        name="firstName"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${formik.errors.firstName ? 'border-red-500' : ''
                            }`}
                    />
                    {formik.errors.firstName && <div className="text-red-500 text-xs mt-1">{formik.errors.firstName}</div>}
                </div>
                <div className="col-span-1">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">{t("input.lastName.label")}</label>
                    <input
                        type="text"
                        name="lastName"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${formik.errors.lastName ? 'border-red-500' : ''
                            }`}
                    />
                    {formik.errors.lastName && <div className="text-red-500 text-xs mt-1">{formik.errors.lastName}</div>}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1 sm:col-span-1">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${formik.errors.email ? 'border-red-500' : ''
                            }`}
                    />
                    {formik.errors.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                </div>
                {/* Reusable Phone Number Input */}
                <div className="col-span-1">
                    <PhoneNumberInput
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        label={t("input.phone.label")}
                        error={formik.errors.phoneNumber}
                    />
                </div>
            </div>
            {/* LocationSelector Component */}
            <LocationSelector
                values={formik.values}  // Pass down Formik's values
                errors={formik.errors}  // Pass down Formik's errors
                touched={formik.touched} // Pass down Formik's touched
                handleChange={formik.handleChange} // Pass down Formik's handleChange
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="py-3 px-6 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    {t("btn.next")}
                </button>
            </div>
        </form>
    );
};

export default UserShippingInfo;