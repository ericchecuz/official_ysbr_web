import styles from "../styles/join_us.module.css";
import labels from '../labels.json';

function JoinUs() {
  return (
    <section className={`${styles.sectionJoinUs}`} id="join">
      <h1 className={styles.title_section}>{labels.joinUs.title}</h1>
      <p className={styles.description}>{labels.joinUs.description}</p>
      <button className={styles.joinButton}>{labels.joinUs.button}</button>
    </section>
  )
}

export default JoinUs
