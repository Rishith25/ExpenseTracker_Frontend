import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locale/en.json";
import esJSON from "./locale/es.json";
import grJSON from "./locale/gr.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: { ...enJSON },
      es: { ...esJSON },
      gr: { ...grJSON },
    },
    fallbackLng: "en",
  });
