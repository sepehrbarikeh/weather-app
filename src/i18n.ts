import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Cookies from "js-cookie";

import en from "./locales/en/translation.json";
import fa from "./locales/fa/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fa: { translation: fa },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["cookie", "navigator"],
      caches: ["cookie"],
      cookieMinutes: 60 * 24 * 7, 
      lookupCookie: "lang",
    },
  });

const currentLang = Cookies.get("lang") || i18n.language;
document.body.dir = currentLang === "fa" ? "rtl" : "ltr";

export default i18n;
