import styles from '../styles/hero.module.css';
import banner from '../assets/YSBR_Crowner_banner-1_page-0001.jpg'; 

function Hero() {
  return (
    <section className={styles.hero_section} id="hero">
      <img
        src={banner}
        alt="Banner"
        className={styles.bg_img}
      />
    </section>
  );
}

export default Hero;
