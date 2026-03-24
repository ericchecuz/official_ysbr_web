import styles from "../styles/join_us.module.css";
import { FaInstagram } from "react-icons/fa";

function JoinUs() {
  return (
    <section className={styles.sectionJoinUs} id="join">
      <h1 className={styles.title_section}>UNISCITI ALLA FAM</h1>
      <div className={styles.descriptionBlock}>
        <p className={styles.description}>
          Tesserarti con la YSBR Fam significa far parte di una community che condivide valori, passioni ed esperienze autentiche.
        </p>
        <p className={styles.description}>Essere parte della Fam ti permette di:</p>
        <div className={styles.benefitsBlock}>
          <p className={styles.benefitItem}>· Partecipare ad attività ed eventi riservati ai soci</p>
          <p className={styles.benefitItem}>· Sostenere i progetti dell'associazione</p>
          <p className={styles.benefitItem}>· Contribuire alla crescita di una realtà indipendente e autentica</p>
        </div>
        <p className={styles.description}>Unisciti a noi!</p>
      </div>
      <div className={styles.ctaContainer}>
        <a
          href="https://www.cognitoforms.com/YSBR1/YESBROASDModuloIscrizione"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaPrimary}
        >
          DIVENTA SOCIO/A
        </a>
        <a
          href="https://instagram.com/ysbrfam/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaSecondary}
        >
          <FaInstagram style={{ marginRight: "0.5rem", verticalAlign: "-2px" }} />
          FOLLOW US
        </a>
        <button className={styles.ctaOutline} disabled>
          SOSTIENICI — 5x1000 (coming soon)
        </button>
      </div>
    </section>
  );
}

export default JoinUs;
