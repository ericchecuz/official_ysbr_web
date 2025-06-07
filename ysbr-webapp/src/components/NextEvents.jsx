import styles from "../styles/next_event.module.css";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LuMousePointerClick } from "react-icons/lu";
import { motion, AnimatePresence, delay } from "framer-motion";
import labels from "../labels.json";

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

  // Varianti di animazione per il carosello
  const imageVariants = {
    hidden: {
      opacity: 0,
      x: "-25%",
    },
    visible: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      x: "25%",
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  };

  const previewLeftVariants = {
    hidden: {
      opacity: 0,
      x: "-45%", // Move CSS translateX to Framer Motion
      y: "-50%", // Move CSS translateY to Framer Motion
    },
    visible: {
      opacity: 0.4,
      x: "-20%",
      y: "-50%",
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      x: "-0%",
      y: "-50%",
      transition: {
        duration: 0.2,
        delay: 0,
      },
    },
  };

  const previewRightVariants = {
    hidden: {
      opacity: 0,
      x: "0%",
      y: "-50%",
    },
    visible: {
      opacity: 0.4,
      x: "20%",
      y: "-50%",
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      x: "45%",
      y: "-50%",
      transition: {
        duration: 0.2,
        delay: 0.2,
      },
    },
  };

  // Get previous and next indices
  const getPrevIndex = () => (currentIndex - 1 + items.length) % items.length;
  const getNextIndex = () => (currentIndex + 1) % items.length;

  const currentItem = items[currentIndex];
  const prevItem = items[getPrevIndex()];
  const nextItem = items[getNextIndex()];

  const info = "CLICCA SULLA GRAFICA PER MAGGIORI INFORMAZIONI";

  return (
    <section className={`${styles.sectionAboutUs} ${className}`}>
      <div className={styles.container_main}>
        <h1 className={styles.title_section}>{labels.nextEvents.title}</h1>
        <p className={styles.description}>
          YSBR è un'associazione che promuove uno stile di vita attivo e
          sostenibile attraverso eventi che combinano sport, musica e natura. La
          nostra missione è creare esperienze uniche che stimolino corpo e
          mente, in un ambiente di condivisione e divertimento.
        </p>

        <div className={styles.carouselContainer}>
          {/* Sezione Immagine e Navigazione */}
          <div className={styles.imageWrapper}>
            {/* Freccia Sinistra */}
            <div className={styles.arrowContainer}>
              <button onClick={prevSlide} className={styles.navButton}>
                <FaAngleLeft size="1.5rem" />
              </button>
            </div>

            {/* Contenitore Immagini con Preview */}
            <div className={styles.imageSection}>
              {/* Previous Image (Left) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`prev-${getPrevIndex()}`}
                  className={styles.previewImageLeft}
                  variants={previewLeftVariants}
                  exit="exit"
                  initial="hidden"
                  animate="visible"
                >
                  <img
                    src={prevItem.image}
                    alt={prevItem.title}
                    className={styles.previewImage}
                    onClick={() => goToSlide(getPrevIndex())}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Current Image (Center) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`main-${currentIndex}`}
                  className={styles.mainImageContainer}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className={styles.carouselImage}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Image (Right) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`next-${getNextIndex()}`}
                  className={styles.previewImageRight}
                  variants={previewRightVariants} // Use specific right variants
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <img
                    src={nextItem.image}
                    alt={nextItem.title}
                    className={styles.previewImage}
                    onClick={() => goToSlide(getNextIndex())}
                  />
                </motion.div>
              </AnimatePresence>
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
          <LuMousePointerClick size="2.5rem" color="#f1e600" />
          <p className={styles.descriptionInfo}>{info}</p>
        </div>
      </div>
    </section>
  );
}

export default NextEvents;
