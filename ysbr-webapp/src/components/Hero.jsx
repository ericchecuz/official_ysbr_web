import styles from '../styles/hero.module.css';
import backgroundVideo from '../assets/hero-video-1.mp4'; 
import labels from '../labels.json';

function Hero() {
  return (
    <section className={styles.hero_section} id="hero">
      <video
        src={backgroundVideo}
        className={styles.bg_img}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className={styles.hero_content}>
        <h1 className={styles.hero_title}>{labels.hero.title}</h1>
        <p className={styles.hero_subtitle}>{labels.hero.subtitle}</p>
        <button className={styles.hero_button}>{labels.hero.button}</button>
      </div>
    </section>
  );
}

export default Hero;
