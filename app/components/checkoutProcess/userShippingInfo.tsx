// pp/components/checkoutProcess/userShippingInfo.tsx
import React from 'react';
import { useFormik } from 'formik';
import { userShippingValidationSchema } from '~/validation/userShippingValidation';

const UserShippingInfo: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            city: '',
            zip: '',
        },
        validationSchema: userShippingValidationSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.name && <div className="text-red-500 text-xs">{formik.errors.name}</div>}
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                    type="text"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.address && <div className="text-red-500 text-xs">{formik.errors.address}</div>}
            </div>
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                    type="text"
                    name="city"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.city && <div className="text-red-500 text-xs">{formik.errors.city}</div>}
            </div>
            <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip</label>
                <input
                    type="text"
                    name="zip"
                    onChange={formik.handleChange}
                    value={formik.values.zip}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.errors.zip && <div className="text-red-500 text-xs">{formik.errors.zip}</div>}
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

export default UserShippingInfo;