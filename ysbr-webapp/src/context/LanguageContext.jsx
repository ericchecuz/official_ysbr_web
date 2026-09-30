import { createContext, useContext, useState, useCallback, useEffect } from "react";
import it from "../translations/it.json";
import en from "../translations/en.json";

const translations = { it, en };
const SUPPORTED = ["it", "en"];
const STORAGE_KEY = "ysbr-lang";

const LanguageContext = createContext();

// In navigazione privata o con i cookie bloccati localStorage può lanciare:
// la lingua non è abbastanza importante da far saltare il sito
function readStoredLang() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignorato di proposito */
  }
}

// ?lang= ha la precedenza sulla scelta salvata: così un link condiviso si apre
// nella lingua di chi lo ha mandato, anche se il destinatario era già passato
function readInitialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (SUPPORTED.includes(fromUrl)) return fromUrl;

  const stored = readStoredLang();
  if (SUPPORTED.includes(stored)) return stored;

  return "it";
}

function writeLangToUrl(lang) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("lang") === lang) return;

  params.set("lang", lang);
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}?${params}${window.location.hash}`
  );
}

// "page" sceglie titolo e descrizione della pagina in translations.meta
export function LanguageProvider({ page = "home", children }) {
  const [lang, setLang] = useState(readInitialLang);

  const changeLang = useCallback((newLang) => {
    storeLang(newLang);
    writeLangToUrl(newLang);
    setLang(newLang);
  }, []);

  // La lingua finisce sempre nell'URL, così basta copiarlo dalla barra
  // degli indirizzi per condividere la pagina nella lingua giusta
  useEffect(() => {
    writeLangToUrl(lang);
    document.documentElement.lang = lang;

    // L'HTML statico ha titolo e descrizione in italiano (vedi vite-seo.js)
    const { title, description } = translations[lang].meta[page];
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [lang, page]);

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
