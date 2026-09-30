import { useId, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/faq_item.module.css";

// Parte veloce e si posa dolcemente, come l'entrata delle modali
const SETTLE = [0.22, 1, 0.36, 1];

// Apertura: prima si allunga il riquadro, poi compare il testo.
// Chiusura: il testo sparisce subito e il riquadro si richiude.
const answerVariants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: SETTLE },
      opacity: { duration: 0.25, delay: 0.1 },
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.15 },
    },
  },
};

const Answer = motion.div;

/*
 * Domanda che si apre e si chiude con un'animazione morbida.
 * La risposta resta sempre nell'HTML (solo con altezza zero quando è chiusa),
 * quindi Google la legge anche se nessuno la apre; "inert" la nasconde a
 * tastiera e lettori di schermo finché è chiusa.
 */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();

  return (
    <div className={`${styles.item} ${open ? styles.open : ""}`}>
      <h3 className={styles.heading}>
        <button
          type="button"
          className={styles.question}
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <span>{question}</span>
          <span className={styles.icon} aria-hidden="true">
            +
          </span>
        </button>
      </h3>
      <Answer
        id={answerId}
        className={styles.answerWrap}
        variants={answerVariants}
        initial={false}
        animate={open ? "open" : "closed"}
        inert={!open}
      >
        <p className={styles.answer}>{answer}</p>
      </Answer>
    </div>
  );
}

export default FaqItem;
