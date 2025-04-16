import { useState } from 'react';
import styles from '../styles/about_us.module.css';

function AboutUs({ items, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentItem = items[currentIndex];
  const title = "About Us";

  return (
    <section className={`${styles.sectionAboutUs} ${className}`}>
      <div className={styles.container_main}>
        <h1 className={styles.title_section}>{ title}</h1>
      <div className={styles.carouselContainer}>
        {/* Sezione Testo */}
        <div className={styles.textSection}>
          <h1 className={styles.title}>{currentItem.title}</h1>
          <p className={styles.description}>{currentItem.description}</p>
        </div>

        {/* Sezione Immagine e Navigazione */}
        <div className={styles.imageWrapper}>
          {/* Freccia Sinistra */}
          <div className={styles.arrowContainer}>
            <button onClick={prevSlide} className={styles.navButton}>
              &lt;
            </button>
          </div>

          {/* Contenitore Immagine */}
          <div className={styles.imageSection}>
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className={styles.carouselImage}
            />
            {/* Indicatori di Scorrimento */}
            <div className={styles.dotsContainer}>
              {items.map((_, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Freccia Destra */}
          <div className={styles.arrowContainer}>
            <button onClick={nextSlide} className={styles.navButton}>
              &gt;
            </button>
          </div>
        </div>
        </div>
        </div>
    </section>
  );
}

export default AboutUs;