import { Fragment } from "react";
import styles from "../styles/courses.module.css";
import {
  IoBoatOutline,
  IoBodyOutline,
  IoCardOutline,
  IoCubeOutline,
  IoTimeOutline,
} from "react-icons/io5";

// La chiave "icon" nelle traduzioni sceglie l'icona della singola voce di listino
const ENTRY_ICONS = {
  time: IoTimeOutline,
  package: IoCubeOutline,
  boat: IoBoatOutline,
  card: IoCardOutline,
  body: IoBodyOutline,
};

/*
 * Riquadri del listino come sul volantino.
 *   layout "stack": uno sotto l'altro (colonna della sezione Corsi in home)
 *   layout "row":   affiancati, dove c'è spazio (pagina dedicata al corso)
 */
function PriceList({ sections = [], layout = "stack" }) {
  return (
    <div className={layout === "row" ? styles.priceRow : styles.priceStack}>
      {sections.map((section, i) => (
        <Fragment key={i}>
          {/* Come sul volantino: il tesseramento si somma all'attività scelta */}
          {section.membership && i > 0 && (
            <span className={styles.plus} aria-hidden="true">
              +
            </span>
          )}
          <div
            className={`${styles.priceGroup} ${
              section.membership ? styles.membershipGroup : ""
            }`}
          >
            <span className={styles.priceGroupTitle}>{section.title}</span>
            {section.entries.map((entry, j) => {
              const Icon = ENTRY_ICONS[entry.icon];
              return (
                <div key={j} className={styles.priceEntry}>
                  {Icon && (
                    <span className={styles.priceIcon}>
                      <Icon />
                    </span>
                  )}
                  <span className={styles.priceBody}>
                    <span className={styles.price}>{entry.price}</span>
                    <span className={styles.priceNote}>{entry.note}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default PriceList;
