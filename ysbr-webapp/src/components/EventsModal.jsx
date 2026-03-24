import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import styles from "../styles/events_modal.module.css";
import { useLanguage } from "../context/LanguageContext";

const currentYear = new Date().getFullYear();

const eventsData = [
  {
    id: 1,
    month: 1,
    endDate: `${currentYear}-02-28`,
    title: "Snow'N'Funky Trip",
    location: "Madesimo (SO)",
    tags: ["snowboard", "ski", "camping", "party open-air"],
  },
  {
    id: 2,
    month: 2,
    endDate: `${currentYear}-03-07`,
    title: "EDS Skatepark",
    location: "Milano Bicocca (MI)",
    tags: ["skateboard", "balance game", "stand"],
  },
  {
    id: 3,
    month: 2,
    endDate: `${currentYear}-03-22`,
    title: "THE MELTDOWN",
    location: "Madesimo (SO)",
    tags: ["snowboard", "ski", "camping", "party open-air"],
  },
  {
    id: 4,
    month: 3,
    endDate: `${currentYear}-04-12`,
    title: "MICELIUM SOUND",
    location: "LUME - Milano (MI)",
    collab: true,
    tags: ["party", "balance game", "stand"],
  },
  {
    id: 5,
    month: 3,
    endDate: `${currentYear}-05-03`,
    title: "Kite'N'Funky Trip",
    location: "Marina di Grosseto (GR)",
    tags: ["kitesurf", "camping", "party open-air"],
  },
  {
    id: 6,
    month: 4,
    endDate: `${currentYear}-05-16`,
    title: "BUKA",
    location: "Milano (MI)",
    collab: true,
    tbc: true,
    tags: ["party", "balance game", "stand"],
  },
  {
    id: 7,
    month: 5,
    endDate: `${currentYear}-06-07`,
    title: "MILANO SUD FESTIVAL",
    location: "Parco Ravizza - Milano (MI)",
    collab: true,
    tags: ["stand", "party open-air", "balance game"],
  },
  {
    id: 8,
    month: 5,
    endDate: `${currentYear}-06-15`,
    title: "SAVE THE LAKE",
    location: "Valmadrera (CO)",
    collab: true,
    tbc: true,
    tags: ["kitesurf", "festival", "stand", "party open-air", "yoga", "camping"],
  },
  {
    id: 9,
    month: 5,
    endDate: `${currentYear}-06-27`,
    title: "BUKA",
    location: "Milano (MI)",
    collab: true,
    tbc: true,
    tags: ["party", "balance game", "stand"],
  },
  {
    id: 10,
    month: 6,
    endDate: `${currentYear}-07-04`,
    title: "Wake'N'Funky Trip",
    location: "Pavia (PV)",
    tags: ["wakesurf", "camping", "party open-air", "yoga"],
  },
  {
    id: 11,
    month: 8,
    endDate: `${currentYear}-09-06`,
    title: "KOMOREBI",
    location: "Cuneo (CN)",
    collab: true,
    tags: ["festival", "stand", "party open-air", "yoga", "camping"],
  },
  {
    id: 12,
    month: 8,
    endDate: `${currentYear}-09-13`,
    title: "ULTIMA FESTA",
    location: "Marina di Grosseto (GR)",
    tags: ["kitesurf", "festival", "stand", "party open-air"],
  },
  {
    id: 13,
    month: 11,
    endDate: `${currentYear}-12-08`,
    title: "SANTAMBRO",
    location: "Montgenèvre (FR)",
    tags: ["snowboard", "chalet", "private party", "ski"],
  },
];

const ALL_TAGS = [...new Set(eventsData.flatMap((e) => e.tags))].sort();

function isPast(endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(endDate) < today;
}

function EventsModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [activeTags, setActiveTags] = useState([]);
  const months = t("eventsModal.months");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = activeTags.length > 0
    ? eventsData.filter((e) => activeTags.every((tag) => e.tags.includes(tag)))
    : eventsData;

  const eventsByMonth = months.map((name, i) => ({
    name,
    events: filtered.filter((e) => e.month === i),
  })).filter((m) => m.events.length > 0);

  const handleClose = () => {
    onClose();
    setActiveTags([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{t("eventsModal.title")} {currentYear}</h2>
              <button
                className={styles.closeBtn}
                onClick={handleClose}
                aria-label={t("eventsModal.closeLabel")}
              >
                <IoClose size="1.4rem" />
              </button>
            </div>

            <div className={styles.tagsBar}>
              <button
                className={`${styles.tagChip} ${activeTags.length === 0 ? styles.tagChipActive : ""}`}
                onClick={() => setActiveTags([])}
              >
                {t("eventsModal.all")}
              </button>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  className={`${styles.tagChip} ${activeTags.includes(tag) ? styles.tagChipActive : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className={styles.scrollContent}>
              {eventsByMonth.map((month) => (
                <div key={month.name} className={styles.monthSection}>
                  <h3 className={styles.monthTitle}>{month.name}</h3>
                  <div className={styles.eventsGrid}>
                    {month.events.map((event) => (
                      <div
                        key={event.id}
                        className={`${styles.eventCard} ${isPast(event.endDate) ? styles.eventCardPast : ""}`}
                      >
                        <div className={styles.eventCardHeader}>
                          <h4 className={styles.eventTitle}>
                            {event.title}
                            {event.collab && <span className={styles.collabBadge}>{t("eventsModal.collab")}</span>}
                            {event.tbc && <span className={styles.tbcBadge}>{t("eventsModal.tbc")}</span>}
                          </h4>
                        </div>
                        <p className={styles.eventDate}>
                          <IoCalendarOutline className={styles.inlineIcon} />
                          {t(`eventsModal.dates.${event.id}`)}
                        </p>
                        <p className={styles.eventLocation}>
                          <IoLocationOutline className={styles.inlineIcon} />
                          {event.location}
                        </p>
                        <div className={styles.eventTags}>
                          {event.tags.map((tag) => (
                            <span key={tag} className={styles.eventTag}>{tag}</span>
                          ))}
                        </div>
                        {isPast(event.endDate) && (
                          <span className={styles.pastLabel}>{t("eventsModal.past")}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {eventsByMonth.length === 0 && (
                <p className={styles.emptyState}>{t("eventsModal.empty")}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EventsModal;
