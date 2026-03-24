import { useState } from "react";
import styles from "../styles/about_us.module.css";
import ChipGroup from "./commons/ChipGroup";
import Carousel from "./commons/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import labels from "../labels.json";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpg";

function AboutUs({ items, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const textVariants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        staggerChildren: 0.6,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
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
        <h1 className={styles.title_section}>{labels.aboutUs.title}</h1>
        <ChipGroup
          categories={items.map((item) => item.category)}
          selectedCategory={currentIndex}
          onCategoryChange={goToSlide}
          categoryColors={categoryColors}
        />

        <div className={styles.carouselContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentCategory}`}
              className={styles.textSection}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h1
                className={styles.title}
                style={getTitleStyle(currentCategory)}
                variants={childVariants}
              >
                {currentItem.title}
              </motion.h1>
              <motion.p
                className={styles.description}
                variants={childVariants}
              >
                {currentItem.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <Carousel
                key={currentCategory}
                slides={currentImages}
                showArrows={true}
                showDots={true}
                autoPlay={true}
                interval={5000}
                info={labels.aboutUs.carouselInfo}
              />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
