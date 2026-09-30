import styles from "../styles/traveling_van.module.css";

// Ruota con raggi a croce e mozzo rosa: i raggi rendono visibile la rotazione
function Wheel({ cx }) {
  return (
    <g className={styles.wheel}>
      <circle cx={cx} cy="46" r="8" fill="#000" stroke="#fff" strokeWidth="2" />
      <rect x={cx - 1} y="40" width="2" height="12" fill="#fff" opacity="0.85" />
      <rect x={cx - 6} y="45" width="12" height="2" fill="#fff" opacity="0.85" />
      <circle cx={cx} cy="46" r="2.2" fill="var(--accent-color)" />
    </g>
  );
}

/*
 * Van con la tavola sul tetto: racconta che, finché non c'è la YESBRO Surf
 * House, la scuola è itinerante. Arriva e frena al centro, suona e lampeggia
 * per salutare, sgasa e riparte. Disegnato in SVG con i colori del sito,
 * solo decorativo. Le fasi sono tutte sulla stessa durata (--cycle nel CSS),
 * così ruote, sospensioni, tavola, fari e scarico si muovono insieme al van.
 */
function TravelingVan() {
  return (
    <div className={styles.track} aria-hidden="true">
      <span className={styles.road} />
      <div className={styles.lane}>
        <svg className={styles.van} viewBox="-14 0 134 60" width="134" height="60">
          {/* Ombra sulla strada */}
          <ellipse cx="60" cy="55.5" rx="52" ry="2.5" fill="rgba(0, 0, 0, 0.45)" />

          {/* Scarico: sbuffi continui al minimo, due alla sgasata, uno grosso alla partenza */}
          <rect x="2" y="41" width="6" height="2.5" rx="1" fill="#9a9a9a" />
          <circle className={styles.puff} cx="0" cy="42" r="3" fill="#fff" />
          <circle className={`${styles.puff} ${styles.puffLate}`} cx="0" cy="42" r="3" fill="#fff" />
          <circle className={styles.rev} cx="-1" cy="42" r="4" fill="#fff" />
          <circle className={styles.boost} cx="-2" cy="41" r="5" fill="#fff" />

          {/* Carrozzeria: beccheggia sulle sospensioni, le ruote restano a terra */}
          <g className={styles.chassis}>
            <g className={styles.engine}>
              <rect x="34" y="8" width="3" height="5" fill="#fff" />
              <rect x="74" y="8" width="3" height="5" fill="#fff" />
              <rect
                className={styles.board}
                x="24"
                y="2"
                width="64"
                height="6"
                rx="3"
                fill="var(--accent-color)"
              />

              <path
                d="M10 13 H84 Q94 13 100 22 L108 31 Q114 33 114 38 V43 Q114 46 111 46 H9 Q6 46 6 43 V17 Q6 13 10 13 Z"
                fill="#fff"
              />
              <rect x="6" y="35" width="108" height="4" fill="var(--accent-color)" />
              {/* Porta scorrevole */}
              <line x1="59" y1="18" x2="59" y2="45" stroke="rgba(0, 0, 0, 0.18)" strokeWidth="1" />

              <rect x="13" y="18" width="20" height="11" rx="2" fill="#000" />
              <rect x="37" y="18" width="20" height="11" rx="2" fill="#000" />
              <rect x="63" y="18" width="18" height="11" rx="2" fill="#000" />
              <path d="M86 18 H93 Q97 18 101 24 L104 29 H86 Z" fill="#000" />

              <rect x="110" y="40" width="4" height="3" rx="1" fill="#ffe27a" />

              {/* Saluto: lampeggio del faro e colpi di clacson */}
              <g className={styles.glow}>
                <circle cx="116" cy="41.5" r="11" fill="#ffe27a" opacity="0.3" />
                <circle cx="116" cy="41.5" r="5.5" fill="#ffe27a" opacity="0.9" />
              </g>
              <g className={styles.honk} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
                <path d="M121 30 Q125 25 121 20" />
                <path d="M126 32 Q132 25 126 18" />
              </g>
            </g>
          </g>

          <Wheel cx={30} />
          <Wheel cx={92} />
        </svg>
      </div>
    </div>
  );
}

export default TravelingVan;
