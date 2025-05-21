import { useState } from "react";
import styles from "../styles/about_us.module.css";
import ChipGroup from "./commons/ChipGroup";
import Carousel from "./commons/Carousel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// Importiamo correttamente le immagini
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.jpg';
import slide5 from '../assets/slide5.jpg';

function AboutUs({ items, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Usiamo i riferimenti diretti alle immagini importate
  const immagini = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
  ];

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentItem = items[currentIndex];
  const title = "ABOUT US";

  return (
    <section className={`${styles.sectionAboutUs} ${className}`}>
      <div className={styles.container_main}>
        <h1 className={styles.title_section}>{title}</h1>
        <ChipGroup
          categories={items.map((item) => item.category)}
          selectedCategory={currentIndex}
          onCategoryChange={goToSlide}
        />

        <div className={styles.carouselContainer}>
          {/* Sezione Testo */}
          <div className={styles.textSection}>
            <h1 className={styles.title}>{currentItem.title}</h1>
            <p className={styles.description}>{currentItem.description}</p>
          </div>

          {/* CAROSELLO */}
          <Carousel 
            slides={immagini} 
            height='400px'
            showInfo={true}
            infoText="SCORRI LE IMMAGINI PER VEDERE LA GALLERIA"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
