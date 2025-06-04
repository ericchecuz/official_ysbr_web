import { useState, useRef, useEffect } from 'react';
import styles from '../styles/hero.module.css';
// Import all 3 videos
import backgroundVideo1 from '../assets/hero-video-1.mp4'; 
import backgroundVideo2 from '../assets/hero-video-2.mp4'; 
import backgroundVideo3 from '../assets/hero-video-3.mp4'; 

function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  
  // Array with all videos
  const videos = [backgroundVideo1, backgroundVideo2, backgroundVideo3];
  
  // Function to go to next video
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };
  
  // Reset video when source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.error("Video play error:", e));
    }
  }, [currentVideoIndex]);

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
        <h1 className={styles.hero_title}>SPORT, MUSICA <br/> E NATURA</h1>
        <p className={styles.hero_subtitle}>Un mare di eventi dove dare sfogo <br/> alla tua energia!</p>
        <button className={styles.hero_button}>SCOPRI DI PIÙ</button>
      </div>
    </section>
  );
}

export default Hero;