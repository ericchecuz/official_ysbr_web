import { useState } from "react";
import styles from "../styles/about_us.module.css";
import ChipGroup from "./commons/ChipGroup";
import Carousel from "./commons/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpg";

function AboutUs({ items, className = "" }) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const categoryImages = {
    FAM: [slide1, slide2],
    SPORT: [slide2, slide3],
    MUSICA: [slide3, slide4],
    NATURA: [slide4, slide5],
  };

  const chipColorScheme = {
    primary: "#ffffff",
    selectedBg: "var(--accent-color)",
    selectedBorder: "var(--accent-color)",
    selectedText: "#ffffff",
    defaultBg: "rgba(232, 50, 138, 0.15)",
    defaultBorder: "var(--accent-color)",
    defaultText: "#ffffff",
    hoverBg: "var(--accent-color)",
    hoverText: "#ffffff",
  };

  const categoryColors = {
    FAM: chipColorScheme,
    SPORT: chipColorScheme,
    MUSICA: chipColorScheme,
    NATURA: chipColorScheme,
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getTitleStyle = (category) => {
    const colors = categoryColors[category];
    if (!colors) return {};

    return {
      color: colors.primary,
      textShadow: `0 0 20px ${colors.primary}30`,
      transition: "all 0.5s ease-in-out",
      transform: "translateY(0)",
    };
  };

  const currentItem = items[currentIndex];
  const currentCategory = currentItem.category;

  const currentImages = categoryImages[currentCategory] || [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
  ];

  return (
    <section className={`${styles.sectionAboutUs} ${className}`}>
      <div className={styles.container_main}>
        <h1 className={styles.title_section}>{t("aboutUs.title")}</h1>
        <ChipGroup
          categories={items.map((item) => item.category)}
          categoryLabels={items.map((item) => t(`aboutUs.categoryLabels.${item.category}`))}
          selectedCategory={currentIndex}
          onCategoryChange={goToSlide}
          categoryColors={categoryColors}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            className={styles.carouselContainer}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.textSection}>
              <h1 className={styles.title} style={getTitleStyle(currentCategory)}>
                {currentItem.title}
              </h1>
              <p className={styles.description}>
                {currentItem.description}
              </p>
            </div>

            <Carousel
              slides={currentImages}
              showArrows={true}
              showDots={true}
              autoPlay={true}
              interval={5000}
              info={t("aboutUs.carouselInfo")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default AboutUs;
