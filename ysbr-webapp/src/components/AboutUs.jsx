import { useEffect, useState } from "react";
import styles from "../styles/about_us.module.css";
import ChipGroup from "./commons/ChipGroup";
import Carousel from "./commons/Carousel";
import CrossfadeStack from "./commons/CrossfadeStack";
import ServicesModal from "./ServicesModal";
import { useLanguage } from "../context/LanguageContext";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpg";

import slide1Music from "../assets/image-music-1.jpg";
import slide2Music from "../assets/image-music-2.jpg";
import slide3Music from "../assets/image-music-3.jpg";
import slide4Music from "../assets/image-music-4.jpg";

import slide1Nature from "../assets/image-nature-1.jpg";
import slide2Nature from "../assets/image-nature-2.jpg";
import slide3Nature from "../assets/image-nature-3.jpg";
import slide4Nature from "../assets/image-nature-4.jpg";
import slide5Nature from "../assets/image-nature-5.jpg";
import slide6Nature from "../assets/image-nature-6.jpg";

// Le foto delle gallerie FAM e SPORT vengono auto-importate e ordinate
// numericamente: basta aggiungere image-fam-N.jpg / image-sport-N.jpg in assets.
const importSorted = (glob) =>
  Object.keys(glob)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((key) => glob[key]);

const famImages = importSorted(
  import.meta.glob("../assets/image-fam-*.jpg", { eager: true, import: "default" })
);
const sportImages = importSorted(
  import.meta.glob("../assets/image-sport-*.jpg", { eager: true, import: "default" })
);

function AboutUs({ items, className = "" }) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesCategory, setServicesCategory] = useState(null);

  const CATEGORIES_WITH_SERVICES = ["SPORT", "MUSICA"];

  const openServices = (category) => {
    setServicesCategory(category);
    setServicesOpen(true);
  };

  const categoryImages = {
    FAM: famImages,
    SPORT: sportImages,
    MUSICA: [slide1Music, slide2Music, slide3Music, slide4Music],
    NATURA: [
      slide1Nature,
      slide2Nature,
      slide3Nature,
      slide4Nature,
      slide5Nature,
      slide6Nature,
    ],
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

  // Precarica la prima foto di ogni categoria: al cambio il carosello nuovo
  // entra già con l'immagine pronta, invece che vuoto mentre la scarica
  useEffect(() => {
    Object.values(categoryImages).forEach((images) => {
      if (images[0]) new Image().src = images[0];
    });
    // categoryImages è ricostruito a ogni render ma il contenuto è fisso
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <CrossfadeStack activeKey={currentCategory}>
          <div className={styles.carouselContainer}>
            <div className={styles.textSection}>
              <h1 className={styles.title} style={getTitleStyle(currentCategory)}>
                {currentItem.title}
              </h1>
              <p className={styles.description}>
                {currentItem.description}
              </p>
              {CATEGORIES_WITH_SERVICES.includes(currentCategory) && (
                <button
                  className={styles.servicesCta}
                  onClick={() => openServices(currentCategory)}
                >
                  {t("aboutUs.servicesCta")}
                </button>
              )}
            </div>

            <Carousel
              slides={currentImages}
              showArrows={true}
              showDots={true}
              autoPlay={true}
              interval={5000}
              info={t("aboutUs.carouselInfo")}
            />
          </div>
        </CrossfadeStack>
      </div>
      <ServicesModal
        isOpen={servicesOpen}
        onClose={() => setServicesOpen(false)}
        category={servicesCategory}
      />
    </section>
  );
}

export default AboutUs;
