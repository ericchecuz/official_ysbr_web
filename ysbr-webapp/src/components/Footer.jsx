import React from 'react';
import PropTypes from 'prop-types'; 
import styles from '../styles/footer.module.css';

import instagramIcon from '../assets/icons8-instagram-64.png';
import whatsappIcon from '../assets/icons8-whatsapp-48.png';

function Footer({ logoSrc, address, piva, statuteLink, instagramUrl, whatsappUrl }) {
  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer_content}>
        <div className={styles.footer_content_left}>
          {/* Logo a Sinistra */}
          <div className={styles.logo_container}>
            <img src={logoSrc} alt="YSBR Logo" className={styles.logo} />
          </div>

          <div className={styles.vertical_line}></div>

          {/* Informazioni Centrali */}
          <div className={styles.info_container}>
            <p className={styles.address}>{address}</p>
            <p className={styles.piva}>{piva}</p>
            <a href={statuteLink} className={styles.statute_link}>
              Statuto dell'Associazione
            </a>
          </div>
        </div>

        {/* Icone Social a Destra */}
        <div className={styles.social_container}>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seguici su Instagram"
          >
            <img src={instagramIcon} alt="Instagram" className={styles.social_icon} />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contattaci su WhatsApp"
          >
            <img src={whatsappIcon} alt="WhatsApp" className={styles.social_icon} />
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

Footer.defaultProps = {
  logoSrc: '',
  address: '',
  piva: '',
  statuteLink: '#',
  instagramUrl: '#',
  whatsappUrl: '#',
};

export default Footer;