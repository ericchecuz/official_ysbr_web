import { useState } from "react";
import styles from "../styles/courses.module.css";
import ChipGroup from "./commons/ChipGroup";
import CrossfadeStack from "./commons/CrossfadeStack";
import CourseDetails from "./CourseDetails";
import { IoArrowForward } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";

const CATEGORIES = ["KITE", "YOGA"];

// Categorie annunciate ma non ancora prenotabili: il chip resta grigio e bloccato
const DISABLED_CATEGORIES = ["YOGA"];

// Corsi che hanno una pagina dedicata (vedi kitesurf/index.html)
const COURSE_PAGES = {
  KITE: "/kitesurf/",
};

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

function Courses({ className = "" }) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCategory = CATEGORIES[currentIndex];
  const coursePage = COURSE_PAGES[currentCategory];

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
          disabledCategories={DISABLED_CATEGORIES}
          disabledTitle={t("courses.comingSoon")}
        />

        <CrossfadeStack activeKey={currentCategory}>
          <CourseDetails category={currentCategory} />
        </CrossfadeStack>

        {/* In fondo alla sezione, ben visibile: porta alla pagina completa del corso */}
        {coursePage && (
          <a className={styles.moreButton} href={coursePage}>
            {t(`courses.items.${currentCategory}.moreLink`)}
            <IoArrowForward className={styles.moreIcon} />
          </a>
        )}
      </div>
    </section>
  );
}

export default Courses;
