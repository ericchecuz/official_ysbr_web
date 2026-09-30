import { useEffect } from "react";
import { SECTION_IDS, getHeaderOffset, replaceHash, scrollToSection } from "../utils/sections";

/*
 * Tiene l'hash dell'URL allineato alla sezione che si sta guardando e porta
 * il visitatore nel punto giusto quando apre un link tipo ysbr.it/#courses.
 *
 * Il browser da solo non basta: al primo paint le sezioni non sono ancora
 * montate e, anche dopo, immagini e font spostano il layout. Per questo lo
 * scroll iniziale viene ripetuto finché la pagina non si è assestata, a meno
 * che nel frattempo non sia l'utente a muoversi.
 */
// sectionIds: gli id delle sezioni della pagina. Va passata una costante
// definita fuori dal componente, altrimenti gli effetti ripartono a ogni render.
export function useSectionUrl(sectionIds = SECTION_IDS) {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!sectionIds.includes(id)) return;

    let active = true;
    const stop = () => {
      active = false;
    };
    const jump = () => {
      if (active) scrollToSection(id, "auto");
    };
    const userEvents = ["wheel", "touchstart", "keydown"];

    jump();
    const timers = [setTimeout(jump, 150), setTimeout(jump, 600)];
    window.addEventListener("load", jump);
    userEvents.forEach((event) =>
      window.addEventListener(event, stop, { passive: true, once: true })
    );

    return () => {
      active = false;
      timers.forEach(clearTimeout);
      window.removeEventListener("load", jump);
      userEvents.forEach((event) => window.removeEventListener(event, stop));
    };
  }, [sectionIds]);

  // Scrollspy: l'URL mostra sempre la sezione corrente, pronto da copiare
  useEffect(() => {
    let frame = null;

    const sync = () => {
      frame = null;
      const line = getHeaderOffset() + 24;
      let current = "";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const { top, bottom } = element.getBoundingClientRect();
        if (top <= line && bottom > line) current = id;
      }

      // Arrivati al footer resta selezionata l'ultima sezione
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (!current && atBottom) current = sectionIds[sectionIds.length - 1];

      replaceHash(current);
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(sync);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionIds]);

  // Hash modificato a mano nella barra degli indirizzi o con avanti/indietro
  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace("#", "");
      if (sectionIds.includes(id)) scrollToSection(id);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [sectionIds]);
}
