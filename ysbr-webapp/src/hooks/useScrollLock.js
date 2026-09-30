import { useEffect } from "react";

/*
 * Blocca lo scroll della pagina mentre una modale è aperta, senza salti.
 *
 * Il body viene fissato al punto in cui si trovava (funziona anche su iPhone,
 * dove overflow: hidden da solo non basta). Così però la pagina non ha più
 * niente da scorrere e il browser toglie la barra di scorrimento: tutto si
 * allargava di colpo della sua larghezza e scattava a destra.
 *
 * Per evitarlo il body bloccato mostra una sua barra vuota esattamente dove
 * c'era quella della pagina, e gli elementi fissi (l'header) ricevono la
 * stessa larghezza tramite la variabile CSS --scroll-lock-gap.
 * Su Mac e iPhone le barre si sovrappongono al contenuto e non occupano
 * spazio: lì la differenza è zero e non si compensa niente.
 */
export function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflowY = scrollbarWidth > 0 ? "scroll" : "hidden";
    documentElement.style.setProperty("--scroll-lock-gap", `${scrollbarWidth}px`);

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflowY = "";
      documentElement.style.removeProperty("--scroll-lock-gap");
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
