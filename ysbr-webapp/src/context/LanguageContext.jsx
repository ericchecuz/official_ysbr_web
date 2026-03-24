import { createContext, useContext, useState, useCallback } from "react";
import it from "../translations/it.json";
import en from "../translations/en.json";

const translations = { it, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("ysbr-lang") || "it";
  });

  const changeLang = useCallback((newLang) => {
    localStorage.setItem("ysbr-lang", newLang);
    setLang(newLang);
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let value = translations[lang];
      for (const k of keys) {
        value = value?.[k];
      }
      return value ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
