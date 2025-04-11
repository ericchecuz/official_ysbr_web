import styles from '../styles/hero.module.css';

function Hero() {
  return (
    <section className={styles.hero_section}  id="hero">
      <h1>YESBRO</h1>
      <p>Slogan motivazionale / messaggio principale</p>
      <button>Scopri il prossimo evento</button>
    </section>
  )
}

export default Hero
