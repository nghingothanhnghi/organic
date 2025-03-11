// app/validation/userPaymentValidation.ts
import * as Yup from 'yup';

// export const userPaymentValidationSchema = Yup.object({
//   cardNumber: Yup.string().length(16, 'Card number must be 16 digits').required('Card number is required'),
//   expirationDate: Yup.string().matches(
//     /^(0[1-9]|1[0-2])\/?([0-9]{4})$/,
//     'Expiration date must be in MM/YYYY format'
//   ).required('Expiration date is required'),
//   cvv: Yup.string().length(3, 'CVV must be 3 digits').required('CVV is required'),
// });

export const userPaymentValidationSchema = Yup.object({
  paymentMethod: Yup.string().required("Payment method is required"),
  cardNumber: Yup.string()
    .matches(/^\d+$/, "Only numbers are allowed")
    .when('paymentMethod', ([paymentMethod], schema) =>
      paymentMethod === '2' ? schema.required("Card number is required").length(16, "Card number must be 16 digits") : schema.strip()
    ),
  expirationDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{4})$/, "Expiration date must be in MM/YYYY format")
    .when('paymentMethod', ([paymentMethod], schema) =>
      paymentMethod === '2' ? schema.required("Expiration date is required") : schema.strip()
    ),
  cvv: Yup.string()
    .matches(/^\d+$/, "Only numbers are allowed")
    .when('paymentMethod', ([paymentMethod], schema) =>
      paymentMethod === '2' ? schema.required("CVV is required").length(3, "CVV must be 3 digits") : schema.strip()
    ),
});