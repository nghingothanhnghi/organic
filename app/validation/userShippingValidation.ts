// app/validation/userShippingValidation.ts
import * as Yup from 'yup';

export const userShippingValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  zip: Yup.string().matches(/^[0-9]{5}$/, 'Invalid Zip code').required('Zip code is required'),
});
