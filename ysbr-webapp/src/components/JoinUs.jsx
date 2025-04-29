import styles from "../styles/join_us.module.css";

function JoinUs() {
  const titleButton = "COMPILA IL FORM"
  const description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat"
  return (
    <section className={`${styles.sectionJoinUs}`}id="join">
        <h1 className={styles.title_section}>ISCRIVITI<br />ALL'ASSOCIAZIONE</h1>
      <p className={styles.description}>{description}</p>
      <button className={styles.joinButton}>{titleButton}</button>
    </section>
  )
}

export default JoinUs
