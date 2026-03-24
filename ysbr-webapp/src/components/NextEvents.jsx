import styles from "../styles/next_event.module.css";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import EventsModal from "./EventsModal";

function NextEvents({ className = "" }) {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className={`${styles.sectionNextEvents} ${className}`}>
      <div className={styles.container_main}>
        <h1 className={styles.title_section}>{t("nextEvents.title")}</h1>
        <p className={styles.description}>
          {t("nextEvents.description")}
        </p>

        <div className={styles.ctaContainer}>
          <button className={styles.ctaPrimary} onClick={() => setModalOpen(true)}>
            {t("nextEvents.cta")}
          </button>
        </div>
      </div>

      <EventsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

export default NextEvents;
