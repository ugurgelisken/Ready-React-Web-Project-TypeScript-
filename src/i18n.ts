import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationTR from "./locales/tr/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  tr: { translation: translationTR },
  en: { translation: translationEN },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "tr",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
