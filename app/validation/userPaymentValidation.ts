// app/validation/userPaymentValidation.ts
import * as Yup from 'yup';
import i18next from 'i18next';

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