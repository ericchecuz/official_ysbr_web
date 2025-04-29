import styles from "../styles/partners.module.css";
import ScrollingText from "./ScrollingText";
function Partners() {
   const scrollingItemsIconSponsor = [
    {
      label: 'ICONE SPONSOR',
      icon: null, 
    }
  ];
  const title ="PARTNERS"
  return (
    <section id="partners">
       <h1 className={styles.title_section}>{title}</h1>
         <ScrollingText
          items={scrollingItemsIconSponsor}
          speed={28}
          direction="left"
          textColor="black"
          fontSize="2rem"
          backgroundColor="white"
        />
    </section>
  )
}

export default Partners
