import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from '~/locales/en/translation.json'
import vi from '~/locales/vi/translation.json';

i18n
  .use(Backend) // Load translations from files
  .use(LanguageDetector) // Automatically detect user's language
  .use(initReactI18next) // Bind i18next with React
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi }
    },
    lng: 'vi', // default language
    fallbackLng: 'vi', // fallback language when key is missing in current language
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false // Disable suspense to avoid issues with loading translations
    }
  });

export default i18n;
