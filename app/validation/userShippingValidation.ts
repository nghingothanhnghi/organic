// app/validation/userShippingValidation.ts
import * as Yup from 'yup';

export const userShippingValidationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string()
    .test('is-valid-phone', 'Phone number must be in the correct format: +849099493487, or 909493487', (value) => {
      const normalizedPhone = value?.replace(/[^\d+]/g, '');  // Strip unwanted characters
      return /^(?:\+84\d{9}|\d{9})$/.test(normalizedPhone || '');
    })
    .required('Phone number is required'),
  street: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  district: Yup.string().required('District is required'),
  ward: Yup.string().required('Ward is required'),
  postalCode: Yup.string()
  .matches(/^[0-9]{5}$/, 'Invalid Zip code')
  .required('Zip code is required'),
});
