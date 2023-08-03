import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          nav: {
            home: "Home",
            account: "Account",
            reports: "Reports",
            about: "About",
            contact: "Contact",
          },
          btn: {
            login: "Login",
            logout: "Logout",
            signup: "Sign Up",
            account: "My Account",
          },
        },
      },
      es: {
        translation: {
          nav: {
            home: "Inicio",
            account: "Cuenta",
            reports: "Informa",
            about: "Sobre",
            contact: "Contacto",
          },
          btn: {
            login: "Acceso",
            logout: "Cerrar sesión",
            signup: "Regístrese",
            account: "Mi Cuenta",
          },
        },
      },
    },
  });

export default i18n;
