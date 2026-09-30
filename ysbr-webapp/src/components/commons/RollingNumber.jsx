import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import styles from "../../styles/rolling_number.module.css";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Ogni rullo contiene 0-9 due volte: arrivando sul secondo giro la cifra fa
// almeno un'intera rotazione prima di fermarsi, come un contachilometri
const STRIP = [...DIGITS, ...DIGITS];

/*
 * Numero a rulli: parte da tutti zeri e scorre fino al valore quando entra in
 * vista. Le cifre partono insieme ma quelle più a destra girano più a lungo,
 * così si fermano una dopo l'altra da sinistra verso destra.
 */
function RollingNumber({ value, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const text = String(value);

  return (
    <span ref={ref} className={`${styles.number} ${className}`}>
      {/* Gli screen reader leggono il numero intero, non i rulli */}
      <span className={styles.srOnly}>{text}</span>

      {text.split("").map((char, i) => {
        const digit = Number(char);
        if (Number.isNaN(digit)) {
          return (
            <span key={i} aria-hidden="true">
              {char}
            </span>
          );
        }

        const target = inView || reduceMotion ? 10 + digit : 0;
        return (
          <span key={i} className={styles.window} aria-hidden="true">
            <span
              className={styles.strip}
              style={{
                transform: `translateY(calc(var(--cell) * ${-target}))`,
                transitionDuration: reduceMotion ? "0s" : `${1.4 + i * 0.35}s`,
              }}
            >
              {STRIP.map((n, j) => (
                <span key={j} className={styles.cell}>
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default RollingNumber;
