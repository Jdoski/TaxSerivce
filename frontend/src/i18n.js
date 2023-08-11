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
          home: {
            quickly: "Quickly generate your federal tax returns",
            p2: "SpecTaxular is a free to use federal tax calulator. You can calculate how much in federal taxes you will owe based off anumber of customisable fields.",
            p2b: "Each report will be saved to your account, allowing you to compare different returns so you can make decisions accordingly!",
            p3h: "Fast",
            p3: "Just provide the details for your 1099's or W2's and get an immediate calculation of your taxes.",
            p4h: "Convenient Returns",
            p4: "Your returns are stored to your account so they will be conveniently available to you whenever you need.",
            p5h: "Easily Accessible",
            p5: "Our simplified user interface makes it easy to create an account, login to an account, and get started with calculating your taxes.",
            p6h: "Control Over Your Information",
            p6: "You handle the information on your account and can edit it at any time.",
            p7h: "Create your account to get started",
            p7: "Once signed in, you'll have access to all our SpecTaxular features! Create as many free returns as you desire, for all form types and filing statuses.",
          },
          nav: {
            home: "Home",
            account: "Account",
            reports: "Returns",
            about: "About",
            contact: "Contact",
            welcome: "Welcome",
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
          home: {
            quickly:
              "Genere rápidamente sus declaraciones de impuestos federales",
            p2: "SpecTaxular es un calculador de impuestos federales de uso gratuito. Puede calcular cuánto adeudará en impuestos federales en función de una serie de campos personalizables.",
            p2b: "¡Cada informe se guardará en su cuenta, lo que le permitirá comparar diferentes rendimientos para que pueda tomar decisiones en consecuencia!",
            p3h: "Rapido",
            p3: "Simplemente proporcione los detalles de su 1099 o W2 y obtenga un cálculo inmediato de sus impuestos.",
            p4h: "Devoluciones convenientes",
            p4: "Sus devoluciones se almacenan en su cuenta para que estén convenientemente disponibles para usted cuando las necesite.",
            p5h: "De fácil acceso",
            p5: "Nuestra interfaz de usuario simplificada facilita la creación de una cuenta, iniciar sesión en una cuenta y comenzar a calcular sus impuestos.",
            p6h: "Control sobre su información",
            p6: "Usted maneja la información de su cuenta y puede editarla en cualquier momento.",
            p7h: "Crea tu cuenta para empezar",
            p7: "Una vez que haya iniciado sesión, ¡tendrá acceso a todas nuestras funciones de SpecTaxular! Cree tantas devoluciones gratuitas como desee, para todos los tipos de formularios y estados de presentación.",
          },
          nav: {
            home: "Inicio",
            account: "Cuenta",
            reports: "Impuestos",
            about: "Sobre",
            contact: "Contacto",
            welcome: "Bienvenido",
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
