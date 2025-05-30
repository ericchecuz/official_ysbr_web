import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '../../styles/carousel.module.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

/**
 * Componente Carousel - Un carosello React moderno, responsive e personalizzabile
 * 
 * @param {Object} props
 * @param {Array} props.slides - Array di slide da mostrare (può contenere URL immagini o componenti JSX)
 * @param {number} props.autoPlayDelay - Tempo in ms tra una slide e l'altra in autoplay (default: 5000ms)
 * @param {boolean} props.showNavButtons - Mostra/nascondi i pulsanti di navigazione (default: true)
 * @param {boolean} props.showDots - Mostra/nascondi gli indicatori a punti (default: true)
 * @param {string} props.height - Altezza del carosello (default: '450px')
 * 
 * @example
 * // Esempio base con immagini
 * <Carousel 
 *   slides={['url-immagine-1.jpg', 'url-immagine-2.jpg']} 
 *   height="400px" 
 * />
 * 
 * @example
 * // Esempio con contenuto JSX personalizzato
 * <Carousel 
 *   slides={[<div>Slide 1</div>, <div>Slide 2</div>]} 
 *   showDots={false}
 * />
 */
const Carousel = ({ 
  slides = [], 
  autoPlayDelay = 5000, 
  showNavButtons = true,
  showDots = true,
  height = '450px',
}) => {
  // --- STATI ---
  // Indice della slide corrente (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);
  // Stato dell'autoplay (attivo/disattivo)
  const [isPlaying, setIsPlaying] = useState(true);
  
  // --- RIFERIMENTI ---
  // Riferimento per il timer di autoplay
  const autoPlayRef = useRef(null);
  // Riferimenti per la gestione touch
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  // Riferimento al container del carosello
  const carouselRef = useRef(null);
  
  /**
   * Funzione per mostrare la slide precedente
   * Utilizza useCallback per evitare render non necessari
   */
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);
  
  /**
   * Funzione per mostrare la slide successiva
   * Utilizza useCallback per evitare render non necessari
   */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);
  
  /**
   * Gestione dell'autoplay
   * Cambia slide automaticamente dopo il tempo specificato
   */
  useEffect(() => {
    // Se l'autoplay è disattivato, esce subito
    if (!isPlaying) return;
    
    // Imposta il timer per cambiare slide
    autoPlayRef.current = setTimeout(() => {
      nextSlide();
    }, autoPlayDelay);
    
    // Cleanup: rimuove il timer quando il componente viene smontato o quando cambiano le dipendenze
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentIndex, isPlaying, nextSlide, autoPlayDelay]);
  
  /**
   * Resetta l'autoplay quando l'utente interagisce col carosello
   * Utile per dare più tempo all'utente di vedere la slide corrente
   */
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    setIsPlaying(true);
  }, []);
  
  /**
   * Gestione della navigazione tramite tastiera (frecce sinistra/destra)
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      resetAutoPlay();
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    
    // Aggiunge l'event listener per la tastiera
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup: rimuove l'event listener quando il componente viene smontato
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevSlide, nextSlide, resetAutoPlay]);
  
  /**
   * Gestione degli eventi touch (per dispositivi mobili)
   */
  // Memorizza la posizione iniziale del tocco
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  
  // Memorizza la posizione finale del tocco
  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].clientX;
    handleSwipe();
  };
  
  // Determina la direzione dello swipe e cambia slide
  const handleSwipe = () => {
    resetAutoPlay();
    const threshold = 50; // Soglia in pixel per considerare uno swipe valido
    if (touchEndXRef.current < touchStartXRef.current - threshold) {
      // Swipe verso sinistra - slide successiva
      nextSlide();
    } else if (touchEndXRef.current > touchStartXRef.current + threshold) {
      // Swipe verso destra - slide precedente
      prevSlide();
    }
  };
  
  /**
   * Stato vuoto: se non ci sono slide, mostra un messaggio
   */
  if (slides.length === 0) {
    return (
      <div className={styles['carousel-empty']}>
        Nessuna slide fornita al carosello
      </div>
    );
  }
  
  /**
   * Rendering del componente
   */
  return (
    <div className={styles.carouselWrapper}>
      <div 
        className={styles['carousel-container']}
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ height }}
      >
        {/* Container delle slide */}
        <div className={styles.carousel}>
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
              aria-hidden={index !== currentIndex}
            >
              {typeof slide === 'string' ? (
                // Se la slide è una stringa, trattala come URL immagine
                <img src={slide} alt={`Slide ${index + 1}`} />
              ) : (
                // Altrimenti, renderizza il contenuto JSX passato
                slide
              )}
            </div>
          ))}
        </div>
        
        {/* Pulsanti di navigazione (condizionali) */}
        {showNavButtons && (
          <>
            <div className={styles.leftArrowContainer}>
              <button 
                className={styles.navButton}
                onClick={() => {
                  resetAutoPlay();
                  prevSlide();
                }}
                aria-label="Slide precedente"
              >
                <FaAngleLeft size="1.5rem" />
              </button>
            </div>
            
            <div className={styles.rightArrowContainer}>
              <button 
                className={styles.navButton}
                onClick={() => {
                  resetAutoPlay();
                  nextSlide();
                }}
                aria-label="Slide successiva"
              >
                <FaAngleRight size="1.5rem" />
              </button>
            </div>
          </>
        )}
        
        {/* Indicatori a punti (condizionali) */}
        {showDots && (
          <div className={styles['dots-container']}>
            {slides.map((_, index) => (
              <span 
                key={index} 
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => {
                  resetAutoPlay();
                  setCurrentIndex(index);
                }}
                aria-label={`Vai alla slide ${index + 1}`}
                role="button"
                tabIndex={0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel; 