import styles from '../styles/hero.module.css';
import backgroundVideo from '../assets/hero-video.mp4'; 

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
        <h1 className={styles.hero_title}>SPORT, MUSICA E NATURA</h1>
        <p className={styles.hero_subtitle}>Un mare di eventi dove dare sfogo alla tua energia!</p>
        <button className={styles.hero_button}>SCOPRI DI PIÙ</button>
      </div>
    </section>
  );
}

export default Hero;
