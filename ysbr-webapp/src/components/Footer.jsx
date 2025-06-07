import React from 'react';
import PropTypes from 'prop-types'; 
import styles from '../styles/footer.module.css';
import labels from '../labels.json';

import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function Footer({ logoSrc, address, piva, statuteLink, instagramUrl, whatsappUrl }) {
  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer_content}>
        <div className={styles.footer_content_left}>
          {/* Logo a Sinistra */}
          <div className={styles.logo_container}>
            <img src={logoSrc} alt="YSBR Logo" className={styles.logo} />
          </div>

          {/* Informazioni Centrali */}
          <div className={styles.info_container}>
            <p className={styles.address}>{address}</p>
            <p className={styles.piva}>{piva}</p>
            <a href={statuteLink} className={styles.statute_link}>
              {labels.footer.statute}
            </a>
          </div>
        </div>

        {/* Icone Social a Destra */}
        <div className={styles.social_container}>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.footer.social.instagram}
            className={styles.social_icon_container_link}
          >
            <FaInstagram className={styles.social_icon} />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.footer.social.whatsapp}
            className={styles.social_icon_container_link}
          >
            <FaWhatsapp className={styles.social_icon} />
          </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  piva: PropTypes.string.isRequired,
  statuteLink: PropTypes.string.isRequired,
  instagramUrl: PropTypes.string.isRequired,
  whatsappUrl: PropTypes.string.isRequired,
};

export default Footer;