import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../../styles/crossfade_stack.module.css";

// Stessa entrata dei modali del sito: dissolvenza con una leggera salita
const layerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const Layer = motion.div;

/*
 * Dissolvenza tra contenuti che cambiano (es. le categorie di About Us e Corsi)
 * senza che la pagina salti.
 *
 * Con AnimatePresence mode="wait" il contenuto vecchio sparisce prima che
 * entri il nuovo: per un attimo il contenitore resta vuoto, collassa a zero e
 * tutto quello che sta sotto fa su e giù. Qui invece vecchio e nuovo restano
 * sovrapposti nella stessa cella di griglia durante il cambio, e l'altezza del
 * contenitore viene animata da quella vecchia a quella nuova.
 *
 * activeKey: identifica il contenuto mostrato; quando cambia parte la transizione
 */
function CrossfadeStack({ activeKey, children, className = "" }) {
  const activeLayer = useRef(null);
  const [height, setHeight] = useState(null);

  // Il livello in uscita rilascia la ref dopo che è entrato quello nuovo:
  // ignorando il null teniamo sempre il riferimento al livello visibile.
  const trackActiveLayer = useCallback((node) => {
    if (node) activeLayer.current = node;
  }, []);

  useLayoutEffect(() => {
    const node = activeLayer.current;
    if (!node) return;

    const measure = () => setHeight(node.offsetHeight);
    measure();

    // Segue anche i cambi di lingua, il resize e il caricamento di font e foto
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [activeKey]);

  return (
    <div className={`${styles.stack} ${className}`} style={{ height: height ?? "auto" }}>
      <AnimatePresence initial={false}>
        <Layer
          key={activeKey}
          ref={trackActiveLayer}
          className={styles.layer}
          variants={layerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </Layer>
      </AnimatePresence>
    </div>
  );
}

export default CrossfadeStack;
