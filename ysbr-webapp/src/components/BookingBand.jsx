import styles from "../styles/courses.module.css";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";

// Gli stessi contatti della fascia in fondo al volantino
const BOOKING_NUMBERS = [
  { name: "Alessandro", label: "+39 342 154 5885", href: "https://wa.me/393421545885" },
  { name: "Ben", label: "+41 76 281 08 98", href: "https://wa.me/41762810898" },
];
const INSTAGRAM = { label: "@ysbrfam", href: "https://instagram.com/ysbrfam/" };

// Fascia nera con i contatti per prenotare, come il piede del volantino
function BookingBand({ className = "" }) {
  const { t } = useLanguage();

  return (
    <div className={`${styles.booking} ${className}`}>
      <div className={styles.bookingHead}>
        <span className={styles.bookingTitle}>{t("courses.bookCta")}</span>
        <a
          className={styles.bookingSocial}
          href={INSTAGRAM.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoInstagram className={styles.bookingSocialIcon} />
          {INSTAGRAM.label}
        </a>
      </div>
      <div className={styles.bookingLinks}>
        {BOOKING_NUMBERS.map((number) => (
          <a
            key={number.href}
            className={styles.bookingLink}
            href={number.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoWhatsapp className={styles.bookingIcon} />
            <span className={styles.bookingText}>
              <span className={styles.bookingName}>{number.name}</span>
              <span className={styles.bookingNumber}>{number.label}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default BookingBand;
