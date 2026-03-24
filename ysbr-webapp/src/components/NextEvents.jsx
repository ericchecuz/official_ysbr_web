import styles from "../styles/next_event.module.css";
import { useState } from "react";
import labels from "../labels.json";
import EventsModal from "./EventsModal";

function NextEvents({ className = "" }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className={`${styles.sectionNextEvents} ${className}`}>
      <div className={styles.container_main}>
        <h1 className={styles.title_section}>{labels.nextEvents.title}</h1>
        <p className={styles.description}>
          Gli eventi YSBR non sono solo intrattenimento: sono esperienze che si vivono. Momenti in cui sport, musica e natura si incontrano, creando connessioni reali tra persone e territorio.
          Dai festival agli eventi outdoor, ogni progetto nasce per valorizzare la community, sostenere la scena indipendente e vivere ogni spazio in modo attivo e consapevole.
          Eventi unici ma uniti dalla stessa energia: condividere, muoversi, vivere.
        </p>

        <div className={styles.ctaContainer}>
          <button className={styles.ctaPrimary} onClick={() => setModalOpen(true)}>
            PROSSIMI EVENTI
          </button>
        </div>
      </div>

      <EventsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

export default NextEvents;
