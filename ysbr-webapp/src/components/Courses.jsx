import { useState } from "react";
import styles from "../styles/courses.module.css";
import ChipGroup from "./commons/ChipGroup";
import { motion, AnimatePresence } from "framer-motion";
import { IoLocationOutline } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";

const CATEGORIES = ["KITE", "YOGA"];

// Sezione a sfondo chiaro: chip con testo nero di default, pieni in accent quando selezionati
const chipColorScheme = {
  primary: "#000000",
  selectedBg: "var(--accent-color)",
  selectedBorder: "var(--accent-color)",
  selectedText: "#ffffff",
  defaultBg: "rgba(232, 50, 138, 0.08)",
  defaultBorder: "var(--accent-color)",
  defaultText: "#000000",
  hoverBg: "var(--accent-color)",
  hoverText: "#ffffff",
};

const categoryColors = {
  KITE: chipColorScheme,
  YOGA: chipColorScheme,
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

function Courses({ className = "" }) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCategory = CATEGORIES[currentIndex];
  const priceSections = t(`courses.items.${currentCategory}.priceSections`);
  const location = t(`courses.items.${currentCategory}.location`);

  return (
    <section className={`${styles.sectionCourses} ${className}`}>
      <div className={styles.container_main}>
        <h1 className={styles.title_section}>{t("courses.title")}</h1>
        <ChipGroup
          categories={CATEGORIES}
          categoryLabels={CATEGORIES.map((c) => t(`courses.categoryLabels.${c}`))}
          selectedCategory={currentIndex}
          onCategoryChange={setCurrentIndex}
          categoryColors={categoryColors}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            className={styles.contentContainer}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.textSection}>
              <h1 className={styles.title}>
                {t(`courses.items.${currentCategory}.title`)}
              </h1>
              <p className={styles.description}>
                {t(`courses.items.${currentCategory}.description`)}
              </p>
              {location && (
                <span className={styles.location}>
                  <IoLocationOutline className={styles.locationIcon} />
                  {location}
                </span>
              )}
            </div>

            <div className={styles.priceCard}>
              <h3 className={styles.priceCardTitle}>{t("courses.priceListTitle")}</h3>
              {priceSections.map((section, i) => (
                <div key={i} className={styles.priceSection}>
                  <span className={styles.priceSectionTitle}>{section.title}</span>
                  {section.entries.map((entry, j) => (
                    <div key={j} className={styles.priceEntry}>
                      <span className={styles.priceNote}>{entry.note}</span>
                      <span className={styles.price}>{entry.price}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Courses;
