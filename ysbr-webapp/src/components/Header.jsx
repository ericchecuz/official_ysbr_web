import React , { useState , useEffect , useCallback }  from 'react';
import styles from '../styles/header.module.css'
function Header({ leftItems = [], rightItems = [], logoSrc }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Funzione debounce per limitare la frequenza degli aggiornamenti
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Gestione dello scroll
  const handleScroll = useCallback(
    debounce(() => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (delta > 0) {
        setIsHeaderVisible(false);
      } else if (delta < 0 || currentScrollY <= 0) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    }, 50),  /* sec trascorsi prima di effettuare un altra chiamata */
    [lastScrollY]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  return (
     <header
      className={`${styles.header_container} ${
        isHeaderVisible ? styles.visible : styles.hidden
      }`}
    >
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