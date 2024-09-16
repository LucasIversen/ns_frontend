// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // loads translations from /public/locales
  .use(LanguageDetector) // detects language automatically (from browser or path)
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    fallbackLng: "en", // use English if language detection fails
    debug: true, // enable debug mode in development
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    backend: {
      loadPath: "../public/locals/{{lng}}/{{ns}}.json", // Path to translation files
    },
  });

export default i18n;
