import styles from "../styles/traveling_van.module.css";

/*
 * Van con la tavola sul tetto che attraversa la strada: racconta che, finché
 * non c'è la YESBRO Surf House, la scuola è itinerante. Disegnato in SVG con i
 * colori del sito, quindi niente immagini da caricare. Solo decorativo.
 */
function TravelingVan() {
  return (
    <div className={styles.track} aria-hidden="true">
      <span className={styles.road} />
      <div className={styles.lane}>
        <svg className={styles.van} viewBox="0 0 120 58" width="120" height="58">
          <g className={styles.body}>
            {/* Tavola e portapacchi sul tetto */}
            <rect x="24" y="2" width="64" height="6" rx="3" fill="var(--accent-color)" />
            <rect x="34" y="8" width="3" height="5" fill="#fff" />
            <rect x="74" y="8" width="3" height="5" fill="#fff" />

            {/* Carrozzeria con il muso inclinato */}
            <path
              d="M10 13 H84 Q94 13 100 22 L108 31 Q114 33 114 38 V43 Q114 46 111 46 H9 Q6 46 6 43 V17 Q6 13 10 13 Z"
              fill="#fff"
            />
            <rect x="6" y="35" width="108" height="4" fill="var(--accent-color)" />

            {/* Finestrini */}
            <rect x="13" y="18" width="20" height="11" rx="2" fill="#000" />
            <rect x="37" y="18" width="20" height="11" rx="2" fill="#000" />
            <rect x="61" y="18" width="20" height="11" rx="2" fill="#000" />
            <path d="M86 18 H93 Q97 18 101 24 L104 29 H86 Z" fill="#000" />

            {/* Faro */}
            <rect x="110" y="40" width="4" height="3" rx="1" fill="#ffe27a" />
          </g>

          <g className={styles.wheel}>
            <circle cx="30" cy="46" r="8" fill="#000" stroke="#fff" strokeWidth="2" />
            <rect x="29" y="40" width="2" height="12" fill="#fff" />
          </g>
          <g className={styles.wheel}>
            <circle cx="92" cy="46" r="8" fill="#000" stroke="#fff" strokeWidth="2" />
            <rect x="91" y="40" width="2" height="12" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default TravelingVan;
