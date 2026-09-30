// Sezioni raggiungibili da menu e da link diretto (es. ysbr.it/?lang=it#courses).
// Gli slug restano in inglese in entrambe le lingue, così un link condiviso
// continua a funzionare anche se chi lo apre cambia lingua.
export const SECTION_IDS = ["about", "joinus", "events", "courses"];

export function getHeaderOffset() {
  const header = document.querySelector("header");
  return header ? header.offsetHeight : 0;
}

export function scrollToSection(id, behavior = "smooth") {
  const target = document.getElementById(id);
  if (!target) return false;

  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: Math.max(top, 0), behavior });
  return true;
}

// Riscrive l'URL senza ricaricare e senza sporcare la cronologia,
// mantenendo i parametri già presenti (come ?lang=)
export function replaceHash(hash) {
  const { pathname, search } = window.location;
  const next = `${pathname}${search}${hash ? `#${hash}` : ""}`;

  if (next !== `${pathname}${search}${window.location.hash}`) {
    window.history.replaceState(null, "", next);
  }
}
