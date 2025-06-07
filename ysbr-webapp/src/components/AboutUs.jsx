import { useState } from "react";
import styles from "../styles/about_us.module.css";
import ChipGroup from "./commons/ChipGroup";
import Carousel from "./commons/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import labels from "../labels.json";

// Importiamo correttamente le immagini
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpg";

function AboutUs({ items, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Varianti di animazione per il testo e il carosello
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
        staggerChildren: 0.6, // Stagger title and description
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

  // Definiamo le immagini per ogni categoria
  const categoryImages = {
    YSBR: [slide1, slide2],
    SPORT: [slide2, slide3],
    MUSIC: [slide3, slide4],
    NATURE: [slide4, slide5],
  };

  // Definiamo i colori per ogni categoria
  const categoryColors = {
    YSBR: {
      primary: "#ffffff", // White
      selectedBg: "#ffffff", // White background when selected
      selectedBorder: "#ffffff", // White border when selected
      selectedText: "var(--color-main)", // Dark purple text when selected
      defaultBg: "transparent", // Transparent background when not selected
      defaultBorder: "#ffffff", // White border when not selected
      defaultText: "#ffffff", // White text when not selected
      hoverBg: "#ffffff", // White background on hover
      hoverText: "var(--color-main)", // Dark purple text on hover
    },
    SPORT: {
      primary: "var(--title-color)", // Yellow (#f1e600)
      selectedBg: "var(--title-color)", // Yellow background when selected
      selectedBorder: "var(--title-color)", // Yellow border when selected
      selectedText: "var(--color-main)", // Dark purple text when selected
      defaultBg: "transparent", // Transparent background when not selected
      defaultBorder: "var(--title-color)", // Yellow border when not selected
      defaultText: "var(--title-color)", // Yellow text when not selected
      hoverBg: "var(--title-color)", // Yellow background on hover
      hoverText: "var(--color-main)", // Dark purple text on hover
    },
    MUSIC: {
      primary: "var(--accent-color)", // Pink (#E8328A)
      selectedBg: "var(--accent-color)", // Pink background when selected
      selectedBorder: "var(--accent-color)", // Pink border when selected
      selectedText: "var(--color-main)", // Dark purple text when selected
      defaultBg: "transparent", // Transparent background when not selected
      defaultBorder: "var(--accent-color)", // Pink border when not selected
      defaultText: "var(--accent-color)", // Pink text when not selected
      hoverBg: "var(--accent-color)", // Pink background on hover
      hoverText: "var(--color-main)", // Dark purple text on hover
    },
    NATURE: {
      primary: "var(--green-main)", // Green (#61bb83)
      selectedBg: "var(--green-main)", // Green background when selected
      selectedBorder: "var(--green-main)", // Green border when selected
      selectedText: "var(--color-main)", // Dark purple text when selected
      defaultBg: "transparent", // Transparent background when not selected
      defaultBorder: "var(--green-main)", // Green border when not selected
      defaultText: "var(--green-main)", // Green text when not selected
      hoverBg: "var(--green-main)", // Green background on hover
      hoverText: "var(--color-main)", // Dark purple text on hover
    },
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
      transition: "all 0.5s ease-in-out", // Add smooth transition
      transform: "translateY(0)", // For smooth repositioning
    };
  };

  const currentItem = items[currentIndex];
  const currentCategory = currentItem.category;

  // Otteniamo le immagini per la categoria corrente o usiamo tutte le immagini come fallback
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
          {/* Animated Text Section */}
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
                variants={childVariants} // Add this
              >
                {currentItem.title}
              </motion.h1>
              <motion.p 
                className={styles.description}
                variants={childVariants} // Add this
              >
                {currentItem.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Animated Carousel */}
              <Carousel
                key={currentCategory} // This key triggers the animation
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
