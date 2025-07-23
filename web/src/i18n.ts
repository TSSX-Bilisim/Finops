import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from 'i18next-http-backend';

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'tr'],
        fallbackLng: "en",
        load: 'languageOnly', // 'en-US' → 'en'

        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        detection: {
            order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
            lookupFromPathIndex: 0,
            caches: ['localStorage', 'cookie'],
        },

        ns: ['common'],
        defaultNS: 'common',

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: true,
        },

        saveMissing: true,
    })