import { useState } from "react";
import styles from "../styles/join_us.module.css";
import { FaInstagram } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import CollabModal from "./CollabModal";

function JoinUs() {
  const { t } = useLanguage();
  const [collabOpen, setCollabOpen] = useState(false);

  return (
    <section className={styles.sectionJoinUs} id="join">
      <h1 className={styles.title_section}>{t("joinUs.title")}</h1>
      <div className={styles.descriptionBlock}>
        <p className={styles.description}>
          {t("joinUs.intro")}
        </p>
        <p className={styles.description}>{t("joinUs.benefits_intro")}</p>
        <div className={styles.benefitsBlock}>
          <p className={styles.benefitItem}>{t("joinUs.benefit1")}</p>
          <p className={styles.benefitItem}>{t("joinUs.benefit2")}</p>
          <p className={styles.benefitItem}>{t("joinUs.benefit3")}</p>
        </div>
        <p className={styles.description}>{t("joinUs.outro")}</p>
      </div>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaRow}>
          <a
            href="https://www.cognitoforms.com/YSBR1/YESBROASDModuloIscrizione"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            {t("joinUs.ctaPrimary")}
          </a>
          <a
            href="https://instagram.com/ysbrfam/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
          >
            <FaInstagram style={{ marginRight: "0.5rem", verticalAlign: "-2px" }} />
            {t("joinUs.ctaSecondary")}
          </a>
          <button className={styles.ctaSecondary} onClick={() => setCollabOpen(true)}>
            {t("joinUs.ctaCollab")}
          </button>
        </div>
        <button className={styles.ctaOutline} disabled>
          {t("joinUs.ctaDisabled")}
        </button>
      </div>
      <CollabModal isOpen={collabOpen} onClose={() => setCollabOpen(false)} />
    </section>
  );
}

export default JoinUs;
