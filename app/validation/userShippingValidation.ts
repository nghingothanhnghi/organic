// app/validation/userShippingValidation.ts
import * as Yup from 'yup';
import i18next from 'i18next';

// export const userShippingValidationSchema = Yup.object({
//   firstName: Yup.string().required(i18next.t('validation.firstNameRequired')),
//   lastName: Yup.string().required(i18next.t('validation.lastNameRequired')),
//   email: Yup.string()
//     .email(i18next.t('validation.invalidEmail'))
//     .required(i18next.t('validation.emailRequired')),
//   phoneNumber: Yup.string().required(i18next.t('validation.phoneNumberRequired')),
//   street: Yup.string().required(i18next.t('validation.addressRequired')),
//   country: Yup.string().required(i18next.t('validation.countryRequired')),
//   city: Yup.string().required(i18next.t('validation.cityRequired')),
//   district: Yup.string().required(i18next.t('validation.districtRequired')),
//   ward: Yup.string().required(i18next.t('validation.wardRequired')),
//   postalCode: Yup.string()
//     .matches(/^[0-9]{5}$/, i18next.t('validation.invalidPostalCode'))
//     .required(i18next.t('validation.postalCodeRequired')),
// });


export const userShippingValidationSchema = (
  t: (key: string, options?: any) => string
) =>
  Yup.object({
    firstName: Yup.string().required(t('validation.firstNameRequired')),
    lastName: Yup.string().required(t('validation.lastNameRequired')),
    email: Yup.string()
      .email(t('validation.invalidEmail'))
      .required(t('validation.emailRequired')),
    phoneNumber: Yup.string().required(t('validation.phoneNumberRequired')),
    street: Yup.string().required(t('validation.addressRequired')),
    country: Yup.string().required(t('validation.countryRequired')),
    city: Yup.string().required(t('validation.cityRequired')),
    district: Yup.string().required(t('validation.districtRequired')),
    ward: Yup.string().required(t('validation.wardRequired')),
    postalCode: Yup.string()
      .matches(/^[0-9]{5}$/, t('validation.invalidPostalCode'))
      .required(t('validation.postalCodeRequired')),
  });
