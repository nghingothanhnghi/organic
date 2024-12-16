// app/validation/userConfirmValidation.ts
import * as Yup from 'yup';

export const userConfirmValidationSchema = Yup.object({
  termsAndConditions: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
});
