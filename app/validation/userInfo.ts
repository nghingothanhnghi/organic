// app/validation/userInfo.ts
import * as Yup from 'yup';

export const loginValidationSchema = (
  t: (key: string, options?: any) => string
) =>
  Yup.object({
    email: Yup.string()
      .email(t('validation.invalidEmail'))
      .required(t('validation.emailRequired')),
    password: Yup.string()
      .min(6, t('validation.passwordMinLength'))
      .required(t('validation.passwordRequired')),
  });
