import { useState, useRef } from 'react';
import styles from '../styles/hero.module.css';
import heroVideo1 from '../assets/video-sito-ysbr.mp4';
import { useLanguage } from '../context/LanguageContext';

function Hero() {
  const { t } = useLanguage();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const videos = [heroVideo1];

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <section className={styles.hero_section} id="hero">
      <video
        ref={videoRef}
        src={videos[currentVideoIndex]}
        className={styles.bg_img}
        autoPlay
        loop
        muted
        playsInline
        onEnded={handleVideoEnd}
        key={currentVideoIndex}
      />
      <div className={styles.hero_overlay} />
      <div className={styles.hero_content}>
        <h1 className={styles.hero_title}>
          <span className={styles.sport_color}>YSBR FAM</span>
        </h1>
        <div className={styles.hero_subtitles}>
          <span className={styles.hero_subtitle}>{t("hero.subtitle")}</span>
          <span className={styles.hero_subtitle_accent}>{t("hero.tagline")}</span>
        </div>
      </div>
      <div className={styles.scroll_hint}>
        <span>{t("hero.scroll")}</span>
        <div className={styles.scroll_arrow} />
      </div>
    </section>
  );
}

export default Hero;
