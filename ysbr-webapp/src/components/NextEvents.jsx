import styles from "../styles/next_event.module.css";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LuMousePointerClick } from "react-icons/lu";

function NextEvents({ items, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentItem = items[currentIndex];
  const title = "PROSSIMI EVENTI";
  const info = "CLICCA SULLA GRAFICA PER MAGGIORI INFORMAZIONI";

  return (
    <section className={`${styles.sectionAboutUs} ${className}`}>
      <div className={styles.container_main}>
        <h1 className={styles.title_section}>{title}</h1>
        <p className={styles.description}>{currentItem.description}</p>

        <div className={styles.carouselContainer}>
          {/* Sezione Immagine e Navigazione */}
          <div className={styles.imageWrapper}>
            {/* Freccia Sinistra */}
            <div className={styles.arrowContainer}>
              <button onClick={prevSlide} className={styles.navButton}>
                <FaAngleLeft size="1.5rem" />
              </button>
            </div>

            {/* Contenitore Immagine */}
            <div className={styles.imageSection}>
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className={styles.carouselImage}
              />
              </div>

            {/* Freccia Destra */}
            <div className={styles.arrowContainer}>
              <button onClick={nextSlide} className={styles.navButton}>
                <FaAngleRight size="1.5rem" />
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.container_info}>
          <LuMousePointerClick size="2.5rem" color="#f1e600"/>
          <p className={styles.descriptionInfo}>{info}</p>
        </div>
      </div>
    </section>
  );
}

export default NextEvents;