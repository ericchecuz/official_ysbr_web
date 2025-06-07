import styles from "../styles/partners.module.css";
import ScrollingText from "./ScrollingText";
import labels from '../labels.json';

function Partners() {
   const scrollingItemsIconSponsor = [
    {
      label: labels.partners.scrollingText,
      icon: null, 
    }
  ];
  
  return (
    <section id="partners">
       <h1 className={styles.title_section}>{labels.partners.title}</h1>
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
