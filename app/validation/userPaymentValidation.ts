// app/validation/userPaymentValidation.ts
import * as Yup from 'yup';
import i18next from 'i18next';

// export const userPaymentValidationSchema = Yup.object({
//   paymentMethod: Yup.string().required("Payment method is required"),
//   cardNumber: Yup.string()
//     .matches(/^\d+$/, "Only numbers are allowed")
//     .when('paymentMethod', ([paymentMethod], schema) =>
//       paymentMethod === '2' ? schema.required("Card number is required").length(16, "Card number must be 16 digits") : schema.strip()
//     ),
//   expirationDate: Yup.string()
//     .matches(/^(0[1-9]|1[0-2])\/([0-9]{4})$/, "Expiration date must be in MM/YYYY format")
//     .when('paymentMethod', ([paymentMethod], schema) =>
//       paymentMethod === '2' ? schema.required("Expiration date is required") : schema.strip()
//     ),
//   cvv: Yup.string()
//     .matches(/^\d+$/, "Only numbers are allowed")
//     .when('paymentMethod', ([paymentMethod], schema) =>
//       paymentMethod === '2' ? schema.required("CVV is required").length(3, "CVV must be 3 digits") : schema.strip()
//     ),
// });

export const userPaymentValidationSchema = () =>
  Yup.object({
    paymentMethod: Yup.string().required(i18next.t("validation.paymentMethodRequired")),
    cardNumber: Yup.string()
      .matches(/^\d+$/, i18next.t("validation.onlyNumbersAllowed"))
      .when('paymentMethod', ([paymentMethod], schema) =>
        paymentMethod === '2'
          ? schema.required(i18next.t("validation.cardNumberRequired"))
              .length(16, i18next.t("validation.cardNumberLength"))
          : schema.strip()
      ),
    expirationDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/([0-9]{4})$/, i18next.t("validation.expirationDateFormat"))
      .when('paymentMethod', ([paymentMethod], schema) =>
        paymentMethod === '2'
          ? schema.required(i18next.t("validation.expirationDateRequired"))
          : schema.strip()
      ),
    cvv: Yup.string()
      .matches(/^\d+$/, i18next.t("validation.onlyNumbersAllowed"))
      .when('paymentMethod', ([paymentMethod], schema) =>
        paymentMethod === '2'
          ? schema.required(i18next.t("validation.cvvRequired"))
              .length(3, i18next.t("validation.cvvLength"))
          : schema.strip()
      ),
  });