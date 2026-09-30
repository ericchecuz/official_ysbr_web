/*
 * Animazioni comuni a tutte le modali del sito (eventi, servizi, collab,
 * privacy), così si muovono tutte allo stesso modo.
 *
 * Entrata più lunga e morbida, uscita breve e decisa: chi chiude una modale
 * vuole tornare subito alla pagina. Si animano solo opacità e trasformazioni,
 * che il browser gestisce senza ricalcolare il layout.
 */

// Parte veloce e si posa dolcemente
const SETTLE = [0.22, 1, 0.36, 1];

export const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

export const panelMotion = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: SETTLE } },
  exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.18, ease: "easeIn" } },
};
