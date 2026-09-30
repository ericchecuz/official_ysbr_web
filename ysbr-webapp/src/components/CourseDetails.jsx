import styles from "../styles/courses.module.css";
import { IoLocationOutline } from "react-icons/io5";
import PriceList from "./PriceList";
import BookingBand from "./BookingBand";
import { useLanguage } from "../context/LanguageContext";

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

/*
 * Scheda di un corso nella sezione Corsi della home: racconto e istruttori a
 * sinistra, listino e contatti a destra.
 */
function CourseDetails({ category }) {
  const { t } = useLanguage();
  const key = `courses.items.${category}`;

  const description = t(`${key}.description`);
  const paragraphs = Array.isArray(description) ? description : [description];
  const people = toArray(t(`${key}.people`));
  const priceSections = toArray(t(`${key}.priceSections`));
  const closing = t(`${key}.closing`);
  const location = t(`${key}.location`);

  return (
    <div className={styles.panel}>
      <div className={styles.intro}>
        <h2 className={styles.title}>{t(`${key}.title`)}</h2>
        {location && (
          <span className={styles.location}>
            <IoLocationOutline className={styles.locationIcon} />
            {location}
          </span>
        )}

        <div className={styles.story}>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={styles.description}>
              {paragraph}
            </p>
          ))}
        </div>

        {people.length > 0 && (
          <div className={styles.people}>
            {people.map((person, i) => (
              <div key={i} className={styles.person}>
                <span className={styles.personName}>{person.name}</span>
                <span className={styles.personRole}>{person.role}</span>
                <span className={styles.personNote}>{person.note}</span>
              </div>
            ))}
          </div>
        )}

        {closing && <p className={styles.closing}>{closing}</p>}
      </div>

      <div className={styles.priceCard}>
        <div className={styles.priceCardHeader}>
          <h3 className={styles.priceCardTitle}>{t("courses.priceListTitle")}</h3>
          <span className={styles.priceCardRule} aria-hidden="true" />
        </div>
        <PriceList sections={priceSections} />
        <BookingBand />
      </div>
    </div>
  );
}

export default CourseDetails;
