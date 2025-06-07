import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/header.module.css';
import { FaLock } from 'react-icons/fa'; 
import labels from '../labels.json';

function Header({ leftItems = [], rightItems = [], logoSrc }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

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
    }, 50),
    [lastScrollY]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', ''); 
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const header = document.querySelector(`.${styles.header_container}`);
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`${styles.header_container} ${
        isHeaderVisible ? styles.visible : styles.hidden
      }`}
    >
      <nav className={styles.header_nav}>
        <div className={styles.left_links}>
          {leftItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.link}
              onClick={(e) => handleSmoothScroll(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className={styles.logo_container}>
          <img src={logoSrc} alt="Logo" />
        </div>
        <div className={styles.right_container}>
          <div className={`${styles.right_links} ${isMenuOpen ? styles.open : ''}`}>
            {rightItems.map((item) => {
              if (item.type === 'link') {
                // Logica speciale per "SHOP"
                if (item.label === 'SHOP') {
                  return (
                    <span key={item.label} className={styles.shopLink}>
                      {item.label}
                      <FaLock className={styles.lockIcon} />
                    </span>
                  );
                }
                // Altri link
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={styles.link}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                  >
                    {item.label}
                  </a>
                );
              } else if (item.type === 'button') {
                return (
                  <button
                    key={item.label}
                    className={styles.joinButton}
                    onClick={(e) => {
                      if (item.href) {
                        handleSmoothScroll(e, item.href);
                      }
                    }}
                  >
                    {item.label}
                  </button>
                );
              }
              return null;
            })}
          </div>
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburger_line}></span>
            <span className={styles.hamburger_line}></span>
            <span className={styles.hamburger_line}></span>
          </button>
        </div>
        <div className={`${styles.mobile_menu} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobile_left_links}>
            {leftItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.link}
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className={styles.mobile_right_links}>
            {rightItems.map((item) => {
              if (item.type === 'link') {
                // Logica speciale per "SHOP" anche nel menu mobile
                if (item.label === 'SHOP') {
                  return (
                    <span key={item.label} className={styles.shopLink}>
                      {item.label}
                      <FaLock className={styles.lockIcon} />
                    </span>
                  );
                }
                // Altri link
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={styles.link}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                  >
                    {item.label}
                  </a>
                );
              } else if (item.type === 'button') {
                return (
                  <button
                    key={item.label}
                    className={styles.joinButton}
                    onClick={(e) => {
                      if (item.href) {
                        handleSmoothScroll(e, item.href);
                      }
                    }}
                  >
                    {item.label}
                  </button>
                );
              }
              return null;
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  leftItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  rightItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      type: PropTypes.oneOf(['link', 'button']).isRequired,
    })
  ),
  logoSrc: PropTypes.string.isRequired,
};

Header.defaultProps = {
  leftItems: [],
  rightItems: [],
};

export default Header;