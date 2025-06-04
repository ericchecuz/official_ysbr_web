import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/scrolling_text.module.css';

// Numero di ripetizioni per garantire uno scorrimento fluido
const REPETITION_COUNT = 50;

const ScrollingText = ({
  items = [{ label: "NEXT EVENT", icon: null }], 
  speed = 20,
  direction = "left",
  textColor = "black",
  fontSize = "1.5rem",
  backgroundColor = "var(--title-color)",
}) => {
  const animationDirection = direction === "right" ? "scrollRight" : "scrollLeft";

  const repeatedItems = Array.from({ length: REPETITION_COUNT }, () => items).flat();

  return (
    <section className={styles.section_scrolling_text}>
      <div className={styles.scrollContainer} style={{ backgroundColor }}>
        <div
          className={`${styles.scrollText} ${styles[animationDirection]}`}
          style={{
            animationDuration: `${speed}s`,
            color: textColor,
            fontSize,
          }}
        >
          {repeatedItems.map((item, index) => (
            <span key={index} className={styles.textItem}>
              {item.icon && (
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className={styles.icon}
                />
              )}
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

ScrollingText.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string, // Icona opzionale
    })
  ),
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['left', 'right']),
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string,
};

ScrollingText.defaultProps = {
  items: [{ label: "Next Events", icon: null }],
  speed: 20,
  direction: "left",
  textColor: "black",
  fontSize: "1.5rem",
  backgroundColor: "var(--title-color)",
};

export default ScrollingText;