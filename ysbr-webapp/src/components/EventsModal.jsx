import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoCalendarOutline, IoLocationOutline, IoChevronDown } from "react-icons/io5";
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
const ACTIVE_MONTH_INDICES = [...new Set(eventsData.map((e) => e.month))].sort((a, b) => a - b);

function isPast(endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(endDate) < today;
}

const PAST_ONLY_MONTHS = new Set(
  ACTIVE_MONTH_INDICES.filter((mi) =>
    eventsData.filter((e) => e.month === mi).every((e) => isPast(e.endDate))
  )
);

function EventsModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [activeTags, setActiveTags] = useState([]);
  const [activeMonths, setActiveMonths] = useState([]);
  const [timeFilter, setTimeFilter] = useState("upcoming"); // "all" | "upcoming" | "past"
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isMonthsOpen, setIsMonthsOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const tagsDropdownRef = useRef(null);
  const monthsDropdownRef = useRef(null);
  const periodDropdownRef = useRef(null);
  const months = t("eventsModal.months");

  const PERIOD_OPTIONS = [
    { value: "all", label: t("eventsModal.all") },
    { value: "upcoming", label: t("eventsModal.upcoming") },
    { value: "past", label: t("eventsModal.pastEvents") },
  ];

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (top) {
        window.scrollTo(0, parseInt(top, 10) * -1);
      }
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (top) {
        window.scrollTo(0, parseInt(top, 10) * -1);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(e.target)) {
        setIsTagsOpen(false);
      }
      if (monthsDropdownRef.current && !monthsDropdownRef.current.contains(e.target)) {
        setIsMonthsOpen(false);
      }
      if (periodDropdownRef.current && !periodDropdownRef.current.contains(e.target)) {
        setIsPeriodOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleMonth = (monthIndex) => {
    setActiveMonths((prev) =>
      prev.includes(monthIndex) ? prev.filter((m) => m !== monthIndex) : [...prev, monthIndex]
    );
  };

  const resetAll = () => {
    setActiveTags([]);
    setActiveMonths([]);
    setTimeFilter("upcoming");
  };

  const filtered = eventsData.filter((e) => {
    const passTag = activeTags.length === 0 || activeTags.every((tag) => e.tags.includes(tag));
    const passMonth = activeMonths.length === 0 || activeMonths.includes(e.month);
    const past = isPast(e.endDate);
    const passTime =
      timeFilter === "all" ||
      (timeFilter === "upcoming" && !past) ||
      (timeFilter === "past" && past);
    return passTag && passMonth && passTime;
  });

  const eventsByMonth = months.map((name, i) => ({
    name,
    events: filtered.filter((e) => e.month === i),
  })).filter((m) => m.events.length > 0);

  const handleClose = () => {
    onClose();
    resetAll();
    setIsTagsOpen(false);
    setIsMonthsOpen(false);
    setIsPeriodOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
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

            {/* Filters */}
            <div className={styles.filtersBar}>
              <div className={`${styles.filterDropdown} ${styles.filterDropdownLg}`} ref={periodDropdownRef}>
                <button
                  className={`${styles.filterToggle} ${isPeriodOpen ? styles.filterToggleOpen : ""} ${timeFilter !== "all" ? styles.filterToggleHasSelection : ""}`}
                  onClick={() => { setIsPeriodOpen(!isPeriodOpen); setIsTagsOpen(false); setIsMonthsOpen(false); }}
                >
                  <span className={styles.filterToggleLabel}>{t("eventsModal.filterByPeriod")}</span>
                  <IoChevronDown className={`${styles.chevron} ${isPeriodOpen ? styles.chevronOpen : ""}`} />
                </button>
                <div className={`${styles.filterList} ${isPeriodOpen ? styles.filterListOpen : ""}`}>
                  {PERIOD_OPTIONS.map((opt) => (
                    <label key={opt.value} className={styles.filterItem}>
                      <span className={`${styles.checkbox} ${timeFilter === opt.value ? styles.checkboxChecked : ""}`} />
                      <span className={styles.filterLabel}>{opt.label}</span>
                      <input
                        type="radio"
                        name="timeFilter"
                        checked={timeFilter === opt.value}
                        onChange={() => { setTimeFilter(opt.value); setIsPeriodOpen(false); }}
                        className={styles.hiddenInput}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterDropdown} ref={tagsDropdownRef}>
                <button
                  className={`${styles.filterToggle} ${isTagsOpen ? styles.filterToggleOpen : ""} ${activeTags.length > 0 ? styles.filterToggleHasSelection : ""}`}
                  onClick={() => { setIsTagsOpen(!isTagsOpen); setIsMonthsOpen(false); setIsPeriodOpen(false); }}
                >
                  <span className={styles.filterToggleLabel}>{t("eventsModal.filterByActivity")}</span>
                  {activeTags.length > 0 && <span className={styles.filterCount}>{activeTags.length}</span>}
                  <IoChevronDown className={`${styles.chevron} ${isTagsOpen ? styles.chevronOpen : ""}`} />
                </button>
                <div className={`${styles.filterList} ${isTagsOpen ? styles.filterListOpen : ""}`}>
                  {ALL_TAGS.map((tag) => (
                    <label key={tag} className={styles.filterItem}>
                      <span className={`${styles.checkbox} ${activeTags.includes(tag) ? styles.checkboxChecked : ""}`} />
                      <span className={styles.filterLabel}>{tag}</span>
                      <input
                        type="checkbox"
                        checked={activeTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className={styles.hiddenInput}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className={`${styles.filterDropdown} ${styles.filterDropdownSm}`} ref={monthsDropdownRef}>
                <button
                  className={`${styles.filterToggle} ${isMonthsOpen ? styles.filterToggleOpen : ""} ${activeMonths.length > 0 ? styles.filterToggleHasSelection : ""}`}
                  onClick={() => { setIsMonthsOpen(!isMonthsOpen); setIsTagsOpen(false); setIsPeriodOpen(false); }}
                >
                  <span className={styles.filterToggleLabel}>{t("eventsModal.filterByMonth")}</span>
                  {activeMonths.length > 0 && <span className={styles.filterCount}>{activeMonths.length}</span>}
                  <IoChevronDown className={`${styles.chevron} ${isMonthsOpen ? styles.chevronOpen : ""}`} />
                </button>
                <div className={`${styles.filterList} ${isMonthsOpen ? styles.filterListOpen : ""}`}>
                  {ACTIVE_MONTH_INDICES.map((mi) => {
                    const pastOnly = PAST_ONLY_MONTHS.has(mi);
                    return (
                      <label key={mi} className={`${styles.filterItem} ${pastOnly ? styles.filterItemDisabled : ""}`}>
                        <span className={`${styles.checkbox} ${activeMonths.includes(mi) ? styles.checkboxChecked : ""} ${pastOnly ? styles.checkboxDisabled : ""}`} />
                        <span className={styles.filterLabel}>{months[mi]}</span>
                        <input
                          type="checkbox"
                          checked={activeMonths.includes(mi)}
                          onChange={() => !pastOnly && toggleMonth(mi)}
                          disabled={pastOnly}
                          className={styles.hiddenInput}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
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
