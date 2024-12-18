import i18n from 'i18next'; // Import from i18next

export const formatPrice = (price: number): string => {  // Specify 'price' as a number and return type as a string
  let currency = 'VND'; // Default to VND for Vietnamese
  let locale = 'vi-VN'; // Default to Vietnamese locale

  // Set currency and locale based on i18n.language
  if (i18n.language === 'en') {
    currency = 'USD';
    locale = 'en-US';
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
};
