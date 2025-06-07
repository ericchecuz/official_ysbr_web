import { useState } from "react";
import styles from "../styles/about_us.module.css";
import ChipGroup from "./commons/ChipGroup";
import Carousel from "./commons/Carousel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import labels from '../labels.json';

// Importiamo correttamente le immagini
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.jpg';
import slide5 from '../assets/slide5.jpg';

function AboutUs({ items, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Definiamo le immagini per ogni categoria
  const categoryImages = {
    "YSBR": [slide1, slide2],
    "SPORT": [slide2, slide3],
    "MUSIC": [slide3, slide4],
    "NATURE": [slide4, slide5]
  };

  // Definiamo i colori per ogni categoria
  const categoryColors = {
    "YSBR": "var(--color-main)", // Viola scuro
    "SPORT": "var(--green-main)", // Verde
    "MUSIC": "var(--accent-color)", // Rosa
    "NATURE": "#5a4e33" // Marrone (già usato nei chip)
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentItem = items[currentIndex];
  const currentCategory = currentItem.category;
  
  // Otteniamo le immagini per la categoria corrente o usiamo tutte le immagini come fallback
  const currentImages = categoryImages[currentCategory] || [slide1, slide2, slide3, slide4, slide5];

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
          {/* Sezione Testo */}
          <div className={styles.textSection}>
            <h1 className={styles.title}>{currentItem.title}</h1>
            <p className={styles.description}>{currentItem.description}</p>
          </div>

          {/* CAROSELLO */}
          <Carousel
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
