import React , { useState }  from 'react';
import styles from '../styles/header.module.css'
function Header({ leftItems = [], rightItems = [], logoSrc }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header_container}>
      <nav className={styles.header_nav}>
        {/* Sezione Sinistra */}
        <div className={styles.left_links}>
          {leftItems.map((item) => (
            <a key={item.label} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </div>

        {/* Logo Centrale */}
        <div className={styles.logo_container}>
          <img src={logoSrc} alt="Logo" />
        </div>

        {/* Sezione Destra con Hamburger */}
        <div className={styles.right_container}>
          <div className={`${styles.right_links} ${isMenuOpen ? styles.open : ''}`}>
            {rightItems.map((item) => {
              if (item.type === 'link') {
                return <a key={item.label} href={item.href} className={styles.link}>{item.label}</a>;
              } else if (item.type === 'button') {
                return <button key={item.label} className={styles.joinButton}>{item.label}</button>;
              }
              return null;
            })}
          </div>
          <button 
            className={styles.hamburger} 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            <span className={styles.hamburger_line}></span>
            <span className={styles.hamburger_line}></span>
            <span className={styles.hamburger_line}></span>
          </button>
        </div>

        {/* Menu Mobile */}
        <div className={`${styles.mobile_menu} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobile_left_links}>
            {leftItems.map((item) => (
              <a key={item.label} href={item.href} className={styles.link}>
                {item.label}
              </a>
            ))}
          </div>
          <div className={styles.mobile_right_links}>
            {rightItems.map((item) => {
              if (item.type === 'link') {
                return <a key={item.label} href={item.href} className={styles.link}>{item.label}</a>;
              } else if (item.type === 'button') {
                return <button key={item.label} className={styles.joinButton}>{item.label}</button>;
              }
              return null;
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;