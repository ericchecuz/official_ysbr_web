import { useState, useRef } from 'react';
import styles from '../styles/hero.module.css';
import heroVideo1 from '../assets/hero-video-1.mp4';
import heroVideo2 from '../assets/hero-video-2.mp4';
import heroVideo3 from '../assets/hero-video-3.mp4';
import heroVideo4 from '../assets/hero-video-4.mp4';
import labels from '../labels.json';

function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  
  // Array con tutti i video disponibili
  const videos = [
    heroVideo1,
    heroVideo2,
    heroVideo3,
    heroVideo4
  ];

  // Funzione per passare al video successivo quando termina quello corrente
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const renderColoredTitle = () => {
    return (
      <>
        <span className={styles.sport_color}>SPORT</span>
        <span className={styles.comma}>, </span>
        <span className={styles.music_color}>MUSICA</span>
        <span className={styles.comma}> E </span>
        <span className={styles.nature_color}>NATURA</span>
      </>
    );
  };

  return (
    <section className={styles.hero_section} id="hero">
      <video
        ref={videoRef}
        src={videos[currentVideoIndex]}
        className={styles.bg_img}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        key={currentVideoIndex} // Force re-render when video changes
      />

      <div className={styles.hero_content}>
        <h1 className={styles.hero_title}>
          {renderColoredTitle()}
        </h1>
        <p className={styles.hero_subtitle}>{labels.hero.subtitle}</p>
        <button className={styles.hero_button}>{labels.hero.button}</button>
      </div>
    </section>
  );
}

export default Hero;